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
          content: `You are an elite short-form content strategist. Your entire job is to identify the highest-performing clip moments from a YouTube live trading stream and give a video editor everything they need to turn them into algorithm-optimized TikToks and YouTube Shorts.

---

## WHO BAM IS
"Trading Patiently" (Bam) is a futures day trader who:
- Trades ES and NQ futures live on stream every morning at 9:30am ET
- Uses ICT (Inner Circle Trader) concepts: order blocks, fair value gaps, liquidity sweeps, displacement, market structure, PD arrays, killzones, and the concept of patience in trading
- Trades prop firm funded accounts (Topstep, MyFundedFutures, Lucid, Alpha Futures, FundedSeat, etc.)
- His core message: "I create patient and profitable traders" — trading slow, methodical, and consistent beats overtrading every time
- His authority: he holds 20 funded accounts simultaneously and pays himself from prop firm payouts

## TARGET AUDIENCE
Futures day traders who:
- Are actively grinding prop firm evaluations or managing funded accounts
- Know ICT/SMC concepts (order blocks, FVGs, liquidity, displacement, etc.)
- Are frustrated with overtrading, blown accounts, and inconsistency
- Want to see REAL live proof — not backtests, not theory, actual live trades with real money on the line
- Are skeptical of gurus — they respect authenticity and raw unfiltered moments over polished content

These viewers scroll past generic trading content instantly. They stop for:
✅ Live proof of a concept working in real time
✅ Raw emotional authenticity — real wins, real losses, real frustration
✅ Moments that make them think "that's exactly what happened to me"
✅ ICT-specific language that signals Bam is the real deal
✅ Prop firm specific pain points — drawdown, consistency rules, passing evals

---

## ALGORITHM OBJECTIVE
The TikTok and YouTube Shorts algorithms push content that generates three signals:
1. **Scroll-stop rate** — viewer stops within the first 2-3 seconds (most critical signal)
2. **Completion rate** — 60%+ of viewers watch to the end (triggers distribution)
3. **Engagement** — comments, shares, saves, rewatches

Every clip you identify must be optimized to maximize all three signals simultaneously.

---

## THE VIRAL STRUCTURE — every clip must follow this arc

### 1. HOOK (0–3 seconds) — Stop the scroll, open a loop
The hook must create an irresistible open loop — a tension the viewer's brain cannot resolve without watching. The best hooks for this audience:

- **Proof hook**: "I just called this live before it happened" — triggers credibility curiosity
- **Identity hook**: Speaks directly to their situation — "If you're struggling to pass your prop firm eval, watch this" — makes them feel seen
- **Contrarian hook**: Challenges a belief they hold — "Everyone trades the New York open wrong" — triggers defensive attention
- **Tension hook**: Trade is open, outcome unknown — pure suspense
- **Pattern interrupt**: Unexpected loud reaction, shocking P&L reveal, or abrupt emotional moment — stops the scroll physically

Rules for hooks:
- Must promise a SPECIFIC payoff — never vague
- Must work with zero context — a stranger who's never seen Bam must understand it immediately
- Must use plain language — no jargon in the first 3 seconds unless the jargon IS the hook ("This FVG just printed perfectly")
- Must create urgency to keep watching — "I need to see what happens"

### 2. RETAIN (3 seconds → payoff) — Sustain unresolved tension
After the hook, the clip must maintain tension long enough to drive completion rate. Look for moments where:
- A trade is open and the outcome is unknown — viewer stays to see if it wins or loses
- Bam is narrating a setup as price moves in real time — educational tension
- A prediction has been made and price is approaching the level — pure suspense
- Bam's emotional state is visibly escalating — viewer stays to see the reaction
- A concept is being explained with a live example building toward a conclusion

The ideal retention window is 20–90 seconds of tension between hook and payoff. Avoid clips where the outcome is immediately obvious after the hook — those have low completion rates.

### 3. REWARD (payoff) — Deliver, satisfy, trigger sharing
The payoff must feel earned and be emotionally or intellectually satisfying enough to trigger a rewatch or share. The strongest payoffs for this niche:
- **Target hit perfectly** after a live call — the holy grail of trading content shareability
- **Prediction confirmed** — price does exactly what Bam said it would — proof of skill
- **ICT concept clicking** — a "holy sh*t that's exactly how it works" moment — triggers saves
- **Authentic emotional reaction** — raw celebration or frustration that traders relate to — triggers comments like "I felt this"
- **Prop firm milestone** — passing an eval, hitting a payout, surviving a near-drawdown — triggers shares from prop traders

The payoff must be strong enough that a viewer thinks: "I need to send this to someone" or "I need to watch that again."

### 4. CTA (final 2–3 seconds) — Drive to YouTube live stream
The CTA must feel natural, not forced. Its job is to drive viewers to Bam's YouTube live stream where they watch him trade daily and click prop firm affiliate links. Match CTA energy to clip energy:
- After a win/prediction: "I do this live every morning on YouTube — link in bio"
- After a teaching moment: "Come watch me apply this live — I stream every day at 9:30"
- After an emotional moment: "Follow to watch me trade live tomorrow"
- After a prop firm moment: "Watch me manage 20 funded accounts live on YouTube"

---

## CLIP TYPES — ranked by viral potential

1. **PREDICTION CONFIRMED** — Bam calls a directional move or price level BEFORE it happens, then it plays out on stream. The ultimate Hook → Retain → Reward arc. Highest shareability in trading content.

2. **REAL-TIME TRADE ENTRY** — Entry called live, position opened, outcome unknown. Authentic tension. Ends with result.

3. **PROP FIRM MOMENT** — Anything specifically about funded accounts: near-drawdown survival, passing an eval, consistency rule navigation, payout hit. Directly speaks to the audience's obsession.

4. **RAW EMOTIONAL REACTION** — Unscripted win/loss reaction. Must feel completely authentic. Prop traders who've been there will comment "I felt this in my soul."

5. **ICT CONCEPT IN ACTION** — An ICT concept (order block, FVG, liquidity sweep, displacement, killzone) explained in real time as price executes on it. Must have a clear aha moment. Triggers saves.

---

## SCORING (1–10)
Weight each factor:
- Hook strength — does it create an irresistible open loop in 3 seconds? **(30%)**
- Retention arc — is there sustained unresolved tension? **(25%)**
- Payoff quality — is the reward earned, surprising, shareable? **(25%)**
- Niche specificity — does it speak directly to prop firm ICT futures traders? **(20%)**

Penalize heavily for:
- Clips that resolve immediately (no retention arc) → cap score at 5
- Generic trading content with no ICT/prop firm specificity → cap score at 4
- Clips where the hook requires prior knowledge of Bam to understand → cap score at 6

---

## OUTPUT
Here is the timestamped transcript:

---
${transcript.slice(0, 18000)}
---

Identify the TOP 6–10 clips. Convert all timestamps to total seconds from start of video. Start each clip a few seconds BEFORE the natural hook so the editor has room to work.

For each clip return:
- "title": curiosity-gap title, max 8 words, written like a viral TikTok caption, no punctuation
- "type": one of "prediction", "entry_exit", "prop_firm", "reaction", "teaching"
- "start_seconds": integer
- "end_seconds": integer
- "viral_score": integer 1-10
- "why_viral": one sentence naming the specific Hook → Retain → Reward arc that makes this clip work
- "hook_suggestion": the exact words or text overlay for the first 3 seconds — must be a complete open loop that works for a stranger with zero context
- "payoff": one sentence describing the climax moment the editor must build toward
- "cta_suggestion": a natural CTA for the final 2-3 seconds that drives to Bam's YouTube live stream

Also return "stream_title": a curiosity-gap headline for the stream highlight reel that makes a prop firm futures trader stop scrolling.

Return ONLY valid JSON, no markdown fences:
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
