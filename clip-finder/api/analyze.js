export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Anthropic API key not configured on server.' });
  }

  const { transcript } = req.body;

  if (!transcript || transcript.length < 100) {
    return res.status(400).json({ error: 'Transcript too short or missing.' });
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
          content: `You are an elite short-form content strategist. Your entire job is to identify the highest-performing clip moments from a YouTube live trading stream and give a video editor everything they need to turn them into algorithm-optimized TikToks and YouTube Shorts.

---

## WHO BAM IS
"Trading Patiently" (Bam) is a futures day trader who:
- Trades ES and NQ futures live on stream every morning at 9:30am ET
- Uses ICT (Inner Circle Trader) concepts: order blocks, fair value gaps, liquidity sweeps, displacement, market structure, PD arrays, killzones
- Trades prop firm funded accounts (Topstep, MyFundedFutures, Lucid, Alpha Futures, FundedSeat, etc.)
- His core message: "I create patient and profitable traders"
- His authority: he holds 20 funded accounts simultaneously and pays himself from prop firm payouts

## TARGET AUDIENCE
Futures day traders who are actively grinding prop firm evaluations or managing funded accounts, know ICT/SMC concepts, and want to see REAL live proof. They stop scrolling for:
- Live proof of a concept working in real time
- Raw emotional authenticity — real wins, real losses
- Moments that make them think "that's exactly what happened to me"
- ICT-specific language that signals Bam is the real deal
- Prop firm specific pain points — drawdown, consistency rules, passing evals

---

## ALGORITHM OBJECTIVE
Optimize every clip for:
1. Scroll-stop rate — viewer stops within the first 2-3 seconds
2. Completion rate — 60%+ of viewers watch to the end
3. Engagement — comments, shares, saves, rewatches

---

## THE VIRAL STRUCTURE — Hook (Promised Payoff) → Retain → Reward → CTA

### HOOK (0–3 seconds)
Must create an irresistible open loop. Best hooks for this audience:
- Proof hook: "I just called this live before it happened"
- Identity hook: "If you're struggling to pass your prop firm eval, watch this"
- Contrarian hook: "Everyone trades the New York open wrong"
- Tension hook: Trade is open, outcome unknown
- Pattern interrupt: Unexpected loud reaction, shocking P&L

Rules: Must promise a SPECIFIC payoff. Must work with zero context. Must create urgency.

### RETAIN (3 seconds → payoff)
Look for moments where a trade is open and outcome unknown, Bam is narrating a setup as price moves, a prediction has been made and price is approaching the level, or a concept is being explained with a live example building toward a conclusion.

### REWARD (payoff)
- Target hit perfectly after a live call
- Prediction confirmed — price does exactly what Bam said
- ICT concept clicking — a clear aha moment
- Authentic emotional reaction
- Prop firm milestone — passing an eval, hitting a payout

### CTA (final 2–3 seconds)
Drive to Bam's YouTube live stream. Match energy to clip:
- After a win: "I do this live every morning on YouTube — link in bio"
- After teaching: "Come watch me apply this live — I stream every day at 9:30"
- After prop firm moment: "Watch me manage 20 funded accounts live on YouTube"

---

## CLIP TYPES — ranked by viral potential
1. PREDICTION CONFIRMED — calls a move before it happens, then it plays out
2. REAL-TIME TRADE ENTRY — entry called live, outcome unknown, ends with result
3. PROP FIRM MOMENT — near-drawdown survival, passing eval, payout hit
4. RAW EMOTIONAL REACTION — unscripted win/loss reaction
5. ICT CONCEPT IN ACTION — concept explained in real time with clear aha moment

---

## SCORING (1–10)
- Hook strength — irresistible open loop in 3 seconds (30%)
- Retention arc — sustained unresolved tension (25%)
- Payoff quality — earned, surprising, shareable (25%)
- Niche specificity — speaks to prop firm ICT futures traders (20%)

Penalize: clips that resolve immediately (cap 5), generic content without ICT/prop firm specificity (cap 4).

---

## TRANSCRIPT
${transcript.slice(0, 18000)}

---

Identify TOP 6–10 clips. Convert timestamps to total seconds from start of video.

For each clip return:
- "title": curiosity-gap title, max 8 words, no punctuation
- "type": one of "prediction", "entry_exit", "prop_firm", "reaction", "teaching"
- "start_seconds": integer (start a few seconds before the hook)
- "end_seconds": integer
- "viral_score": integer 1-10
- "why_viral": one sentence naming the specific Hook → Retain → Reward arc
- "hook_suggestion": exact words or text overlay for the first 3 seconds
- "payoff": one sentence describing the climax moment the editor builds toward
- "cta_suggestion": natural CTA driving to Bam's YouTube live stream

Also return "stream_title": curiosity-gap headline for the stream highlight reel.

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
