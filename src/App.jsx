import { useEffect, useState } from 'react';
import { Clock, ArrowRight, Calendar } from 'lucide-react';

const timeZonesList = [
  { label: 'IST (Asia/Kolkata) UTC+05:30', value: 'Asia/Kolkata' },
  { label: 'UTC (UTC) UTC+00:00', value: 'UTC' },
  { label: 'EST (America/New_York) UTC-05:00', value: 'America/New_York' },
  { label: 'EDT (America/New_York DST) UTC-04:00', value: 'America/New_York' },
  { label: 'CST (America/Chicago) UTC-06:00', value: 'America/Chicago' },
  { label: 'CDT (America/Chicago DST) UTC-05:00', value: 'America/Chicago' },
  { label: 'MST (America/Denver) UTC-07:00', value: 'America/Denver' },
  { label: 'MDT (America/Denver DST) UTC-06:00', value: 'America/Denver' },
  { label: 'PST (America/Los_Angeles) UTC-08:00', value: 'America/Los_Angeles' },
  { label: 'PDT (America/Los_Angeles DST) UTC-07:00', value: 'America/Los_Angeles' },
  { label: 'BST (Europe/London DST) UTC+01:00', value: 'Europe/London' },
  { label: 'GMT (Europe/London) UTC+00:00', value: 'Europe/London' },
  { label: 'CET (Europe/Paris) UTC+01:00', value: 'Europe/Paris' },
  { label: 'CEST (Europe/Paris DST) UTC+02:00', value: 'Europe/Paris' },
  { label: 'JST (Asia/Tokyo) UTC+09:00', value: 'Asia/Tokyo' },
  { label: 'AEST (Australia/Sydney) UTC+10:00', value: 'Australia/Sydney' },
  { label: 'AEDT (Australia/Sydney DST) UTC+11:00', value: 'Australia/Sydney' },
];

// Add CSS to index.css or App.css
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #6366f1;
  --primary-light: #818cf8;
  --secondary: #f472b6;
  --accent: #38bdf8;
  --background: #0f172a;
  --card: rgba(255, 255, 255, 0.05);
  --card-border: rgba(255, 255, 255, 0.1);
  --text: #f8fafc;
  --text-secondary: #cbd5e1;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, var(--background), #1e293b);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.App {
  width: 100%;
  max-width: 800px;
  padding: 2rem;
}

.glass-card {
  background: var(--card);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  border: 1px solid var(--card-border);
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  margin-bottom: 24px;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--secondary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease-out;
}

.glass-card:hover::before {
  transform: scaleX(1);
}

.glass-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-icon {
  color: var(--primary);
}

.timezone-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

@media (min-width: 640px) {
  .timezone-row {
    flex-direction: row;
    align-items: center;
  }
}

.timezone-select-container {
  flex: 1;
  position: relative;
}

.timezone-select {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.9rem;
  appearance: none;
  outline: none;
  transition: all 0.2s ease;
}

.timezone-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.timezone-select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-secondary);
}

.arrow-icon {
  margin: 0 16px;
  color: var(--primary);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.5; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.5; transform: scale(0.95); }
}

.time-display {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.time-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.time-value {
  font-size: 1.25rem;
  font-weight: 500;
}

.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--text-secondary), transparent);
  margin: 32px 0;
  opacity: 0.2;
}

.custom-time-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.datetime-input {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;
  width: 100%;
}

.datetime-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.convert-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 8px;
  font-size: 0.9rem;
}

.convert-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.convert-button:active {
  transform: translateY(0);
}

.result-container {
  margin-top: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid var(--primary);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

.app-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, var(--accent), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 1s ease-out;
}

@media (max-width: 640px) {
  .timezone-row {
    flex-direction: column;
  }
  
  .arrow-icon {
    transform: rotate(90deg);
    margin: 8px 0;
  }
}
`;

function App() {
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('Asia/Kolkata');
  const [fromNow, setFromNow] = useState('');
  const [toNow, setToNow] = useState('');
  const [inputDateTime, setInputDateTime] = useState('');
  const [convertedTime, setConvertedTime] = useState('');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Add the styles to the document
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const formatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setFromNow(now.toLocaleString('en-US', { ...formatOptions, timeZone: fromZone }));
      setToNow(now.toLocaleString('en-US', { ...formatOptions, timeZone: toZone }));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, [fromZone, toZone]);

  const convertInputTime = () => {
    if (!inputDateTime) return;

    try {
      const localInput = new Date(inputDateTime);

      if (isNaN(localInput.getTime())) {
        throw new Error('Invalid date');
      }

      const formatted = localInput.toLocaleString('en-US', {
        timeZone: toZone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      setConvertedTime(formatted);
      setShowResult(true);
    } catch (error) {
      console.error('Date conversion error:', error);
      setConvertedTime('Invalid date format');
      setShowResult(true);
    }
  };

  return (
    <div className="App">
      <img src="./src/assets/Logo.svg" alt="Logo" />
      <div className="glass-card">
        <h3>
          <Clock size={20} className="card-icon" />
          Select Timezones
        </h3>

        <div className="timezone-row">
          <div className="timezone-select-container">
            <select
              className="timezone-select"
              value={fromZone}
              onChange={(e) => setFromZone(e.target.value)}
            >
              {timeZonesList.map(({ label, value }) => (
                <option key={value + label} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <ArrowRight size={20} className="arrow-icon" />

          <div className="timezone-select-container">
            <select
              className="timezone-select"
              value={toZone}
              onChange={(e) => setToZone(e.target.value)}
            >
              {timeZonesList.map(({ label, value }) => (
                <option key={value + label} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3>
          <Clock size={20} className="card-icon" />
          Current Time
        </h3>

        <div className="time-display">
          <div>
            <div className="time-label">{fromZone}</div>
            <div className="time-value">{fromNow}</div>
          </div>

          <div className="divider"></div>

          <div>
            <div className="time-label">{toZone}</div>
            <div className="time-value">{toNow}</div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3>
          <Calendar size={20} className="card-icon" />
          Convert Custom Date & Time
        </h3>

        <div className="custom-time-container">
          <div>
            <label className="time-label">Input ({fromZone}):</label>
            <input
              type="datetime-local"
              className="datetime-input"
              value={inputDateTime}
              onChange={(e) => {
                setInputDateTime(e.target.value);
                setShowResult(false);
              }}
            />
          </div>

          <button className="convert-button" onClick={convertInputTime}>
            <ArrowRight size={16} />
            Convert
          </button>

          {showResult && (
            <div className="result-container">
              <div className="time-label">Converted Time in {toZone}:</div>
              <div className="time-value">{convertedTime}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;