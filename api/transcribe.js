export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '25mb',
  },
};

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) return res.status(500).json({ error: 'OpenAI API key not configured.' });

  try {
    const audioBuffer = await readBody(req);
    if (!audioBuffer || audioBuffer.length < 1000) {
      return res.status(400).json({ error: 'No audio data received.' });
    }

    const chunkIndex = parseInt(req.headers['x-chunk-index'] || '0', 10);
    const offsetSeconds = parseFloat(req.headers['x-chunk-offset-seconds'] || '0');
    const mimeType = req.headers['content-type'] || 'audio/webm';

    // Determine file extension from mime type for Whisper
    const ext = mimeType.includes('mp4') ? 'mp4'
      : mimeType.includes('ogg') ? 'ogg'
      : mimeType.includes('wav') ? 'wav'
      : 'webm';

    const boundary = '----WhisperBoundary' + Date.now();
    const pre = Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="chunk_${chunkIndex}.${ext}"\r\n` +
      `Content-Type: ${mimeType}\r\n\r\n`
    );
    const post = Buffer.from(
      `\r\n--${boundary}\r\n` +
      `Content-Disposition: form-data; name="model"\r\n\r\nwhisper-1\r\n` +
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="response_format"\r\n\r\nverbose_json\r\n` +
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="timestamp_granularities[]"\r\n\r\nsegment\r\n` +
      `--${boundary}--\r\n`
    );

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      body: Buffer.concat([pre, audioBuffer, post]),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err?.error?.message || 'Whisper API error' });
    }

    const result = await response.json();
    const segments = (result.segments || []).map(seg => ({
      start: seg.start + offsetSeconds,
      end: seg.end + offsetSeconds,
      text: seg.text,
    }));

    return res.status(200).json({ segments, text: result.text || '', chunkIndex });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error during transcription.' });
  }
}
