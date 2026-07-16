const SYSTEM_INSTRUCTION = `You are Cape Companion, a premium AI travel planner for Cape Town.
IMPORTANT RULE 1: Do NOT use ANY emojis in your response. None. Zero emojis allowed.
IMPORTANT RULE 2: If the user asks for a trip, structure it EXACTLY like this layout using **bold** headers and bullet points:

**MyCapePlanner**
**Your Cape Town Adventure is Ready!**

Based on your preferences:
Destination: Cape Town, South Africa
... (include Budget Breakdown and Local Tips exactly as the user specified previously, completely stripped of emojis)`;

function buildFallbackResponse(chatHistory) {
  const lastUserMessage = [...chatHistory]
    .reverse()
    .find((message) => message.role === 'user' && Array.isArray(message.parts) && message.parts[0]?.text)?.parts[0].text || 'a Cape Town trip';

  return `**MyCapePlanner**
**Your Cape Town Adventure is Ready!**

Based on your request: ${lastUserMessage}

Destination: Cape Town, South Africa

Suggested Plan:
- Morning: Start with Table Mountain or the V&A Waterfront.
- Afternoon: Add a coastal stop like Camps Bay, Chapman’s Peak, or the Cape Peninsula.
- Evening: Finish with a dinner reservation in the city bowl or along the Atlantic Seaboard.

Budget Breakdown:
- Transport: Adjust based on Uber, rental car, or guided tour.
- Food: Mix casual local spots with one premium dinner.
- Activities: Prioritize one major attraction and one flexible backup.

Local Tips:
- Start early to avoid traffic and queues.
- Keep weather in mind for mountain and beach plans.
- Save this itinerary if you want to refine it later.`;
}

exports.sendMessage = async (req, res) => {
  try {
    const { chatHistory } = req.body;

    if (!Array.isArray(chatHistory) || chatHistory.length === 0) {
      return res.status(400).json({ message: 'chatHistory is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const preferredModel = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const fallbackModels = [preferredModel, 'gemini-2.5-flash', 'gemini-flash-latest'].filter(
      (value, index, array) => value && array.indexOf(value) === index
    );

    if (!apiKey) {
      return res.status(500).json({ message: 'Gemini API key is not configured on the server' });
    }

    let lastResult = null;

    for (const model of fallbackModels) {
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
      lastResult = result;

      if (result?.candidates?.length) {
        let botText = result.candidates[0].content.parts[0].text;
        // Aggressive sweep to strip any emojis the model returned anyway
        botText = botText.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '');

        return res.json({ text: botText });
      }

      const errorCode = result?.error?.code;
      const errorStatus = result?.error?.status;
      const errorMessage = String(result?.error?.message || '');
      const isQuotaOrAvailabilityIssue =
        errorCode === 503 ||
        errorStatus === 'UNAVAILABLE' ||
        errorCode === 404 ||
        errorStatus === 'NOT_FOUND' ||
        /quota|rate limit|billing|not found|unsupported/i.test(errorMessage);

      if (!isQuotaOrAvailabilityIssue) {
        console.error('Gemini returned no candidates:', JSON.stringify(result));
        return res.status(502).json({ message: result?.error?.message || 'No response from Gemini' });
      }
    }

    console.error('Gemini unavailable, using local fallback:', JSON.stringify(lastResult));
    return res.json({ text: buildFallbackResponse(chatHistory) });
  } catch (err) {
    console.error('Chat error:', err);
    res.json({
      text: buildFallbackResponse(req.body.chatHistory || []),
    });
  }
};
