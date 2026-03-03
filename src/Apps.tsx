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
            className="featured-icon icon-light"
          />
          <img
            src="/images/neurotype-icon-dark.png"
            alt=""
            className="featured-icon icon-dark"
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
          </div>
        </div>
      </div>

      {/* Featured App: Volo */}
      <div className="featured-app">
        <div className="featured-app-icon">
          <img
            src="/images/volo-icon.png"
            alt="Volo"
            className="featured-icon icon-light"
          />
          <img
            src="/images/volo-icon-dark.png"
            alt=""
            className="featured-icon icon-dark"
          />
        </div>
        <div className="featured-app-details">
          <span className="app-category">Aviation</span>
          <h2>Volo</h2>
          <p className="featured-description">
            Your pilot companion & toolbox. Essential tools and resources for pilots,
            all in one app.
          </p>
          <div className="featured-actions">
            <a
              href="https://volopilot.app"
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
              href="https://apps.apple.com/app/volo"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn appstore-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
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
