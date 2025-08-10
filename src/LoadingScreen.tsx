import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Hide loading screen after completion
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random progress increments
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* LaunchSpace Logo */}
        <div className="loading-logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1"/>
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
            <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.8"/>
            <circle cx="16" cy="6" r="1" fill="currentColor" opacity="0.6"/>
            <circle cx="6" cy="16" r="0.8" fill="currentColor" opacity="0.7"/>
          </svg>
          <h1>LaunchSpace</h1>
        </div>
        
        {/* Loading Text */}
        <p className="loading-text">Launching into the future...</p>
        
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
        
        {/* Animated Dots */}
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      {/* Background Animation */}
      <div className="loading-background">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
