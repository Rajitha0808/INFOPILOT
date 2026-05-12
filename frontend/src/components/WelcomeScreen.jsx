import { useState, useEffect } from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStartConversation }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger content animation after a short delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setIsVisible(false);
    setTimeout(() => {
      onStartConversation();
    }, 500); // Wait for fade out animation
  };

  if (!isVisible) return null;

  return (
    <div className={`welcome-screen ${showContent ? 'show' : ''}`}>
      <div className="welcome-content">
        <div className="logo-container">
          <div className="logo">
            <div className="logo-circle"></div>
            <div className="logo-text">INFOPILOT</div>
          </div>
        </div>
        
        <div className="welcome-text">
          <h1>Welcome to InfoPilot</h1>
          <p>Your AI-powered conversation assistant</p>
        </div>

        <button className="start-button" onClick={handleStart}>
          <span className="button-text">Start New Conversation</span>
          <div className="button-glow"></div>
        </button>

        <div className="features">
          <div className="feature">
            <div className="feature-icon">💬</div>
            <span>Intelligent Conversations</span>
          </div>
          <div className="feature">
            <div className="feature-icon">🤖</div>
            <span>AI-Powered Responses</span>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <span>Real-time Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
