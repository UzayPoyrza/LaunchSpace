import React from 'react';
import './Apps.css';

function Apps() {
  const apps = [
    {
      id: 1,
      name: "TaskFlow Pro",
      description: "AI-powered task management and productivity app",
      logo: "📱",
      category: "Productivity"
    },
    {
      id: 2,
      name: "DataViz Studio",
      description: "Interactive data visualization and analytics platform",
      logo: "📊",
      category: "Analytics"
    },
    {
      id: 3,
      name: "CloudSync",
      description: "Secure cloud storage and file synchronization",
      logo: "☁️",
      category: "Storage"
    }
  ];

  return (
    <div className="apps-page">
      <div className="apps-header">
        <h1>Our Apps</h1>
        <p>Discover our innovative web & AI applications</p>
      </div>
      
      <div className="apps-grid">
        {apps.map((app) => (
          <div key={app.id} className="app-card">
            <div className="app-logo">
              <span className="app-icon">{app.logo}</span>
            </div>
            <div className="app-info">
              <h3>{app.name}</h3>
              <p className="app-description">{app.description}</p>
              <span className="app-category">{app.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Apps; 