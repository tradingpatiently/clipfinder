export default async function handler(req, res) {
  return res.status(200).json({
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    hasAnthropic: !!process.env.ANTHROPIC_API_KEY,
    openAIPrefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.slice(0, 7) : 'missing',
    nodeEnv: process.env.NODE_ENV,
  });
}
