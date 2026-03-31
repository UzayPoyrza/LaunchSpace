import React from 'react';
import './Apps.css';

interface AppData {
  name: string;
  category: string;
  platform: string;
  description: string;
  icon: string;
  iconDark: string;
  websiteUrl: string;
  appStoreUrl?: string;
  comingSoon?: boolean;
}

function Apps() {
  const apps: AppData[] = [
    {
      name: 'Neurotype',
      category: 'Wellness',
      platform: 'Mobile App',
      description:
        'A science-based meditation app, designed to help especially neurodivergent people. Grounded in research, shaped by real needs.',
      icon: '/images/neurotype-icon.png',
      iconDark: '/images/neurotype-icon-dark.png',
      websiteUrl: 'https://neurotypeapp.com',
      appStoreUrl: 'https://apps.apple.com/app/neurotype',
    },
    {
      name: 'Volo',
      category: 'Aviation',
      platform: 'Mobile App',
      description:
        'Your pilot companion & toolbox. Essential tools and resources for pilots, all in one app.',
      icon: '/images/volo-icon.png',
      iconDark: '/images/volo-icon-dark.png',
      websiteUrl: 'https://volopilot.app',
      appStoreUrl: 'https://apps.apple.com/app/volo',
    },
    {
      name: 'Incraft',
      category: 'AI',
      platform: 'Web App',
      description:
        'Generate studio-quality guided meditation in one prompt. Natural voice narration, timed pauses, tailored scripts.',
      icon: '/images/incraft-icon.png',
      iconDark: '/images/incraft-icon-dark.png',
      websiteUrl: 'https://incraft.io',
    },
    {
      name: 'Myro',
      category: 'Education',
      platform: 'CLI Tool',
      description:
        'An adaptive competitive programming trainer. The shortest path to red.',
      icon: '/images/myro-icon.png',
      iconDark: '/images/myro-icon-dark.png',
      websiteUrl: 'https://myro.coach',
    },
  ];

  const upcomingApps = [
    { id: 1, category: 'Analytics' },
    { id: 2, category: 'Storage' },
    { id: 3, category: 'Development' },
    { id: 4, category: 'Design' },
    { id: 5, category: 'Finance' },
  ];

  return (
    <div className="apps-page">
      <div className="apps-header">
        <h1>Our Apps</h1>
        <p>Discover our innovative web & AI applications</p>
      </div>

      <div className="apps-grid">
        {apps.map((app) => (
          <div
            key={app.name}
            className={`app-card${app.comingSoon ? ' app-card--coming-soon' : ''}`}
          >
            {app.comingSoon && (
              <span className="coming-soon-badge">Coming Soon</span>
            )}
            <span className={`platform-tag platform-${app.platform.toLowerCase().replace(' ', '-')}`}>
              {app.platform === 'Mobile App' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              )}
              {app.platform === 'Web App' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              )}
              {app.platform === 'CLI Tool' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              )}
              {app.platform}
            </span>
            <div className="app-card-icon">
              <img
                src={app.icon}
                alt={app.name}
                className="app-icon icon-light"
              />
              <img
                src={app.iconDark}
                alt=""
                className="app-icon icon-dark"
              />
            </div>
            <span className="app-category">{app.category}</span>
            <h2>{app.name}</h2>
            <p className="app-description">{app.description}</p>
            <div className="app-actions">
              <a
                href={app.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn website-btn"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Website
              </a>
              {app.appStoreUrl && (
                <a
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn appstore-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </a>
              )}
            </div>
          </div>
        ))}
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
