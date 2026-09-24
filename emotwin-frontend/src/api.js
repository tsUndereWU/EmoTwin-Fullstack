const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const analyzeText = async (text, userId = 'web-user') => {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, user_id: userId }),
  });

  if (!response.ok) throw new Error('Ошибка сети или сервера');
  return await response.json();
};