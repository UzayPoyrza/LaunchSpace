import React, { useState, useEffect } from 'react';
import './Apps.css';

function Apps() {
  const [clickedApp, setClickedApp] = useState<number | null>(null);
  
  const apps = [
    {
      id: 1,
      name: "TaskFlow Pro",
      description: "AI-powered task management and productivity app",
      logo: "📱",
      category: "Productivity",
      website: "https://taskflow.launchspace.org",
      appStore: "https://apps.apple.com/app/taskflow-pro"
    },
    {
      id: 2,
      name: "DataViz Studio",
      description: "Interactive data visualization and analytics platform",
      logo: "📊",
      category: "Analytics",
      website: "https://dataviz.launchspace.org",
      appStore: "https://apps.apple.com/app/dataviz-studio"
    },
    {
      id: 3,
      name: "CloudSync",
      description: "Secure cloud storage and file synchronization",
      logo: "☁️",
      category: "Storage",
      website: "https://cloudsync.launchspace.org",
      appStore: "https://apps.apple.com/app/cloudsync"
    }
  ];

  const handleAppClick = (appId: number) => {
    if (window.innerWidth <= 768) {
      // On mobile, toggle the clicked state
      setClickedApp(clickedApp === appId ? null : appId);
    }
  };

  const handleWebsiteClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
    // Close mobile menu after clicking
    if (window.innerWidth <= 768) {
      setClickedApp(null);
    }
  };

  const handleAppStoreClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
    // Close mobile menu after clicking
    if (window.innerWidth <= 768) {
      setClickedApp(null);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth <= 768 && clickedApp !== null) {
        const target = event.target as Element;
        if (!target.closest('.app-card')) {
          setClickedApp(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [clickedApp]);

  return (
    <div className="apps-page">
      <div className="apps-header">
        <h1>Our Apps</h1>
        <p>Discover our innovative web & AI applications</p>
      </div>
      
      <div className="apps-grid">
        {apps.map((app) => (
          <div 
            key={app.id} 
            className={`app-card ${clickedApp === app.id ? 'clicked' : ''}`}
            onClick={() => handleAppClick(app.id)}
          >
            <div className="app-logo">
              <span className="app-icon">{app.logo}</span>
            </div>
            <div className="app-info">
              <h3>{app.name}</h3>
              <p className="app-description">{app.description}</p>
              <span className="app-category">{app.category}</span>
            </div>
            
            {/* Desktop Hover Actions - Split Design */}
            <div className="app-actions-desktop">
              <div className="split-top">
                <button 
                  className="action-btn website-btn"
                  onClick={(e) => handleWebsiteClick(e, app.website)}
                >
                  <span className="btn-icon">🌐</span>
                  Visit Website
                </button>
              </div>
              <div className="split-bottom">
                <button 
                  className="action-btn appstore-btn"
                  onClick={(e) => handleAppStoreClick(e, app.appStore)}
                >
                  <span className="btn-icon">📱</span>
                  Visit in App Store
                </button>
              </div>
            </div>
            
            {/* Mobile Click Actions */}
            <div className="app-actions-mobile">
              <button 
                className="action-btn website-btn"
                onClick={(e) => handleWebsiteClick(e, app.website)}
              >
                <span className="btn-icon">🌐</span>
                Visit Website
              </button>
              <button 
                className="action-btn appstore-btn"
                onClick={(e) => handleAppStoreClick(e, app.appStore)}
              >
                <span className="btn-icon">📱</span>
                Visit in App Store
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Apps;