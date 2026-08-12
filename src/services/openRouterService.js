const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function askNoorAI(messages) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!key) throw new Error('OPENROUTER_NOT_CONFIGURED');

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Noor Islamic App'
    },
    body: JSON.stringify({
      model: import.meta.env.VITE_OPENROUTER_MODEL || 'openrouter/free',
      messages,
      temperature: 0.2
    })
  });

  if (!response.ok) throw new Error(`OPENROUTER_${response.status}`);
  const data = await response.json();
  return data?.choices?.[0]?.message?.content || '';
}
