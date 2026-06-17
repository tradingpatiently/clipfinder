export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transcript } = req.body;

  if (!transcript || transcript.length < 100) {
    return res.status(400).json({ error: 'Transcript too short or missing.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `You are a viral short-form content strategist for a futures trading content creator named "Trading Patiently" (Bam). He streams live ES/NQ futures day trading on YouTube using ICT/Smart Money Concepts methodology.

Here is the timestamped transcript from his YouTube live stream:

---
${transcript.slice(0, 18000)}
---

## YOUR JOB
Identify the TOP 6–10 moments that would make the best viral short-form clips for TikTok and YouTube Shorts.

## VIRAL SHORT-FORM FRAMEWORK
Every clip you identify must be evaluated against this framework:

**The Formula: Hook (Promised Payoff) → Retain → Reward (Deliver Payoff) → CTA**

1. HOOK (first 3 seconds): Does this moment open with something that stops the scroll? Strong hooks include:
   - A bold claim ("I just called this move perfectly")
   - A surprising outcome already visible ("watch what happens next")
   - An emotional trigger — shock, humor, awe, or tension
   - A promised payoff that makes the viewer NEED to watch ("I'm about to show you exactly why this trade worked")

2. RETAIN: After the hook, does the content build tension or deliver information that keeps viewers watching? Look for moments where Bam is building toward something — explaining a setup as it unfolds, waiting for a fill, narrating a trade in real time.

3. REWARD (Payoff): Is there a satisfying conclusion? A target hit, a correct prediction confirmed, a concept that clicks, an emotional reaction to a win or loss. The payoff must feel earned.

4. CTA: Does the moment naturally end in a way that invites a comment, share, or follow? ("Did you see that?" "This is why I trade this way" "Drop a comment if you caught that move")

## CLIP TYPES TO PRIORITIZE
- BIG TRADE ENTRIES/EXITS — real-time calls, fills, "I'm in," price hitting targets, stops getting hit
- EMOTIONAL REACTIONS — hype after a win, frustration after a stop, excitement when a setup plays out
- TEACHING MOMENTS — ICT concepts, SMC setups, liquidity grabs, order blocks, fair value gaps, market structure — only when explained clearly and concisely enough for a short
- LIVE PREDICTIONS — calling a move BEFORE it happens, then it plays out on stream (highest viral potential — hook + retain + reward all in one)

## SCORING
Score each clip's viral potential 1–10 based on:
- Strength of natural hook in the first 3 seconds of the clip (does it stop the scroll?)
- Emotional intensity (humor, surprise, awe, tension)
- Completion likelihood — will viewers watch to the end?
- Payoff satisfaction — is the reward worth the wait?
- How cleanly the Hook → Retain → Reward → CTA arc exists in the raw footage

## OUTPUT
Use the timestamps in the transcript to find exact moments. Convert timestamps to total seconds from start of video.

For each clip return:
- "title": punchy clip title, max 8 words, no punctuation
- "type": one of "entry_exit", "reaction", "teaching", "prediction"
- "start_seconds": integer (start a few seconds BEFORE the hook so editor has room)
- "end_seconds": integer (end after the natural payoff moment, ~90-180s window)
- "viral_score": integer 1-10
- "why_viral": one sentence — specifically reference the Hook/Retain/Reward arc that makes this clip work
- "hook_suggestion": the exact opening line or text overlay for the first 3 seconds to stop the scroll
- "payoff": one sentence describing what the reward/payoff moment is so the editor knows what to build toward

Also return "stream_title": a punchy, curiosity-driven title for this stream's highlight reel.

Return ONLY valid JSON, no markdown:
{"stream_title": "...", "clips": [...]}`,
        }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err?.error?.message || 'Anthropic API error' });
    }

    const data = await response.json();
    const raw = data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')
      .replace(/```json|```/g, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else return res.status(500).json({ error: 'Unexpected response format from AI.' });
    }

    return res.status(200).json(parsed);

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
