import React from 'react';
import './Apps.css';

function Apps() {
  const upcomingApps = [
    { id: 1, category: "Analytics" },
    { id: 2, category: "Storage" },
    { id: 3, category: "Development" },
    { id: 4, category: "Design" },
    { id: 5, category: "Finance" },
  ];

  return (
    <div className="apps-page">
      <div className="apps-header">
        <h1>Our Apps</h1>
        <p>Discover our innovative web & AI applications</p>
      </div>

      {/* Featured App: Neurotype */}
      <div className="featured-app">
        <div className="featured-app-icon">
          <img
            src="/images/neurotype-icon.png"
            alt="Neurotype"
            className="neurotype-icon"
          />
        </div>
        <div className="featured-app-details">
          <span className="app-category">Productivity</span>
          <h2>Neurotype</h2>
          <p className="featured-description">
            A science-based meditation app, designed to help especially neurodivergent people.
            Grounded in research, shaped by real needs.
          </p>
          <div className="featured-actions">
            <a
              href="https://neurotypeapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn website-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Visit Website
            </a>
            <a
              href="https://apps.apple.com/app/neurotype"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn appstore-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                <path d="M15.6 8.4c-.3-.7-1-1.4-1.8-1.4-.4 0-.8.2-1.2.4-.3.2-.5.3-.6.3-.1 0-.3-.1-.6-.3-.4-.2-.8-.4-1.2-.4-1.1 0-2.2 1-2.2 2.6 0 1.6 1.4 4.1 2.5 5.1.4.4.9.6 1.3.6.3 0 .5-.1.8-.2.3-.1.5-.2.8-.2s.5.1.8.2c.3.1.5.2.8.2.4 0 .9-.2 1.3-.6 .6-.6 1-1.4 1.2-1.8-1-.5-1.5-1.5-1.5-2.5 0-.9.5-1.7 1.2-2.2z" />
                <path d="M13 5c.5-.6.8-1.3.8-2-.7.1-1.5.5-2 1.1-.4.5-.8 1.2-.7 2 .7 0 1.4-.4 1.9-1.1z" />
              </svg>
              App Store
            </a>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="coming-soon-section">
        <div className="coming-soon-divider">
          <span className="divider-line"></span>
          <span className="divider-text">More on the way</span>
          <span className="divider-line"></span>
        </div>
        <div className="coming-soon-grid">
          {upcomingApps.map((app) => (
            <div key={app.id} className="coming-soon-card">
              <h3>Coming Soon</h3>
              <span className="app-category">{app.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Apps;
