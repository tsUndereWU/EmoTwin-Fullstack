// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
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
      // Используем localhost для надежности
      const response = await axios.post('http://localhost:8000/analyze', {
        text: text,
        user_id: userId
      });
      
      setResult(response.data.result);
    } catch (err) {
      console.error(err);
      setError('Ошибка соединения с сервером. Убедитесь, что бекенд запущен на порту 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🧠 EmoTwin</h1>
        <p>Ваш персональный AI-компаньон для ментального здоровья</p>
      </header>

      {/* Добавили обертку input-area, чтобы стили сработали */}
      <div className="input-area">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Опишите, что вы чувствуете или что произошло сегодня..."
        />
        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? 'Анализирую...' : 'Получить поддержку'}
        </button>
      </div>

      {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

      {result && (
        <div className="result-card">
          <h2>Результат анализа</h2>
          <p><strong>Эмоция:</strong> {result.emoji} {result.sentiment.toUpperCase()} ({result.confidence}%)</p>
          
          <div className="triggers-list">
            {result.triggers.map((trigger, index) => (
              <span key={index} className="trigger-tag">#{trigger}</span>
            ))}
          </div>

          <div className="advice-block">
            <h3>💡 Рекомендация:</h3>
            <p className="advice-text">{result.personalized_advice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;