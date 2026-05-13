const axios = require('axios');

const AI_PROVIDER = process.env.AI_PROVIDER || 'openrouter';
const AI_MODEL = process.env.AI_MODEL || 'openai/gpt-4o-mini';

const callOpenRouter = async (prompt, maxTokens = 2000) => {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key || key === 'your_openrouter_api_key') {
    console.log('OpenRouter key missing');
    return null;
  }
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: AI_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: maxTokens
      },
      {
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API error:', error.response?.status, error.response?.data || error.message);
    return null;
  }
};

const callGemini = async (prompt) => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'your_gemini_api_key') {
    console.log('Gemini key missing');
    return null;
  }
  try {
    const model = AI_MODEL.replace('gemini/', '');
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
      }
    );
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error('Gemini API error:', error.response?.status, error.response?.data || error.message);
    return null;
  }
};

const getAIResponse = async (prompt, maxTokens = 2000) => {
  if (AI_PROVIDER === 'gemini') {
    const result = await callGemini(prompt);
    if (result) return result;
  }
  const result = await callOpenRouter(prompt, maxTokens);
  if (result) return result;
  return null;
};

module.exports = { callOpenRouter, callGemini, getAIResponse };
