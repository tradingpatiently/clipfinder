# Trading Patiently — Clip Finder

AI-powered tool that auto-transcribes raw stream video (extracted client-side, no large uploads) and surfaces the best viral short-form moments using a Hook → Retain → Reward → CTA framework tuned for futures/ICT/prop firm content.

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import your GitHub repo
3. In Vercel project settings → Environment Variables → add BOTH:
   - Name: `ANTHROPIC_API_KEY`  Value: your Anthropic key (sk-ant-...)
   - Name: `OPENAI_API_KEY`     Value: your OpenAI key (sk-...) — used for Whisper transcription
4. Deploy — share the URL with anyone

## How it works

1. User drops a raw video file (any length) into the browser
2. ffmpeg.wasm extracts audio client-side (mono, 16kHz, compressed) — the big video file never leaves the browser
3. Audio is chunked into ~18 minute segments (under Whisper's 25MB limit) and sent to `/api/transcribe`
4. Each chunk is transcribed via OpenAI Whisper with timestamps, then stitched into one full transcript with correct running timestamps
5. The transcript is sent to `/api/analyze`, which runs the viral clip-finding prompt against Claude
6. Results render as a clip sheet with Hook/Payoff/CTA for each moment

A "Paste Transcript" tab remains available as a manual fallback if someone already has a transcript (e.g. from YouTube captions).

## Notes

- Processing a 1-3hr stream takes several minutes — audio extraction happens in the browser tab, which must stay open
- Whisper transcription cost is roughly $0.006/minute of audio (~$0.36-1.08 per 1-3hr stream)
- Claude analysis cost is a few cents per run
