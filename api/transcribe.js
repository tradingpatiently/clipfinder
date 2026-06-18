export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured on server.' });
  }

  try {
    const contentType = req.headers['content-type'] || '';
    const chunkIndexHeader = req.headers['x-chunk-index'] || '0';
    const chunkOffsetHeader = req.headers['x-chunk-offset-seconds'] || '0';

    const audioBuffer = await readRawBody(req);

    if (!audioBuffer || audioBuffer.length === 0) {
      return res.status(400).json({ error: 'No audio data received.' });
    }

    // Build multipart form data manually for OpenAI Whisper API
    const boundary = '----WhisperBoundary' + Date.now();
    const filename = `chunk_${chunkIndexHeader}.webm`;

    const prePart = Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n` +
      `Content-Type: audio/webm\r\n\r\n`
    );

    const modelPart = Buffer.from(
      `\r\n--${boundary}\r\n` +
      `Content-Disposition: form-data; name="model"\r\n\r\n` +
      `whisper-1\r\n` +
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="response_format"\r\n\r\n` +
      `verbose_json\r\n` +
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="timestamp_granularities[]"\r\n\r\n` +
      `segment\r\n` +
      `--${boundary}--\r\n`
    );

    const body = Buffer.concat([prePart, audioBuffer, modelPart]);

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      body,
    });

    if (!response.ok) {
      const errText = await response.text();
      let errMsg = 'Whisper API error';
      try {
        const errJson = JSON.parse(errText);
        errMsg = errJson?.error?.message || errMsg;
      } catch {}
      return res.status(response.status).json({ error: errMsg });
    }

    const result = await response.json();
    const offsetSeconds = parseFloat(chunkOffsetHeader) || 0;

    // Adjust segment timestamps by the chunk's offset in the full audio
    const segments = (result.segments || []).map(seg => ({
      start: seg.start + offsetSeconds,
      end: seg.end + offsetSeconds,
      text: seg.text,
    }));

    return res.status(200).json({
      text: result.text,
      segments,
      chunkIndex: parseInt(chunkIndexHeader, 10),
    });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error during transcription.' });
  }
}
