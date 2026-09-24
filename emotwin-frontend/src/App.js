// src/App.js
import React, { useState } from 'react';
import { analyzeText } from './api'; // Импортируем нашу функцию
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = "user_moscow_it"; 

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Теперь используем универсальную функцию
      const data = await analyzeText(text, userId);
      setResult(data.result); // Обратите внимание: ответ приходит в поле result
    } catch (err) {
      console.error(err);
      setError('Не удалось связаться с сервером. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🧠 EmoTwin</h1>
        <p>Ваш персональный AI-компаньон для ментального здоровья</p>
      </header>

      <main className="main-content">
        <div className="input-section">
          <textarea
            placeholder="Опишите, что вас беспокоит или радует..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows="4"
          />
          <button onClick={handleAnalyze} disabled={loading || !inputText.trim()}>
            {loading ? 'Анализирую...' : 'Получить поддержку'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {result && (
          <div className="result-card">
            <div className="emotion-header">
              <span className="emoji-large">{result.emoji}</span>
              <h2>{result.sentiment === 'positive' ? 'Позитивный настрой' : result.sentiment === 'negative' ? 'Тревожное состояние' : 'Нейтральное состояние'}</h2>
            </div>
            
            <div className="triggers-section">
              <h3>Выявленные триггеры:</h3>
              <div className="tags">
                {result.triggers.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="advice-section">
              <h3> Персональная рекомендация:</h3>
              <p className="advice-text">{result.personalized_advice}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;