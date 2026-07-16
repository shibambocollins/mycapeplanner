const SYSTEM_INSTRUCTION = `You are Cape Companion, a premium AI travel planner for Cape Town.
IMPORTANT RULE 1: Do NOT use ANY emojis in your response. None. Zero emojis allowed.
IMPORTANT RULE 2: If the user asks for a trip, structure it EXACTLY like this layout using **bold** headers and bullet points:

**MyCapePlanner**
**Your Cape Town Adventure is Ready!**

Based on your preferences:
Destination: Cape Town, South Africa
... (include Budget Breakdown and Local Tips exactly as the user specified previously, completely stripped of emojis)`;

exports.sendMessage = async (req, res) => {
  try {
    const { chatHistory } = req.body;

    if (!Array.isArray(chatHistory) || chatHistory.length === 0) {
      return res.status(400).json({ message: 'chatHistory is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';

    if (!apiKey) {
      return res.status(500).json({ message: 'Gemini API key is not configured on the server' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: chatHistory,
      }),
    });

    const result = await response.json();

    if (!result.candidates || result.candidates.length === 0) {
      console.error('Gemini returned no candidates:', JSON.stringify(result));
      return res.status(502).json({ message: 'No response from Gemini' });
    }

    let botText = result.candidates[0].content.parts[0].text;
    // Aggressive sweep to strip any emojis the model returned anyway
    botText = botText.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '');

    res.json({ text: botText });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ message: 'Failed to reach Gemini' });
  }
};
