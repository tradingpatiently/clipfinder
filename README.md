# Trading Patiently — Clip Finder

Paste a YouTube stream URL, get a ranked list of viral short-form clip moments — built on a Hook → Retain → Reward → CTA framework tuned for futures/ICT/prop firm content. Free to run (uses YouTube's own public caption data, no Whisper/transcription cost).

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import your GitHub repo
3. In Vercel project settings → **Environment Variables** → add:
   - Name: `ANTHROPIC_API_KEY`  Value: your Anthropic key (sk-ant-...)
4. Deploy — share the URL with anyone

No other setup needed. No Blob storage, no Fluid Compute toggle, no OpenAI key — this version is much simpler than earlier iterations.

## How it works

1. Paste your YouTube stream URL
2. `/api/get-transcript.py` (Python) uses the free, open-source `youtube-transcript-api` library to pull YouTube's own caption data directly — no API key, no cost
3. The transcript is sent to `/api/analyze.js` (Node), which runs the viral clip-finding prompt against Claude
4. Results render as a clip sheet with Hook/Payoff/CTA and direct timestamped YouTube links for each moment

A "Paste Transcript" tab remains as a manual fallback for the rare case where YouTube hasn't generated captions yet (usually ready within an hour of upload) or captions are disabled.

## Notes

- This relies on YouTube's auto-generated captions being available. If a fresh VOD shows "no transcript yet," wait an hour and retry, or switch to the Paste Transcript tab using YouTube's manual transcript panel
- Claude analysis cost is a few cents per run — this is the only ongoing cost
