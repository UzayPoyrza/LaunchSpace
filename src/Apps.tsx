import React, { useState, useEffect } from 'react';
import './Apps.css';

function Apps() {
  const [clickedApp, setClickedApp] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
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
    },
    {
      id: 4,
      name: "CodeFlow",
      description: "Advanced code editor with AI assistance",
      logo: "💻",
      category: "Development",
      website: "https://codeflow.launchspace.org",
      appStore: "https://apps.apple.com/app/codeflow"
    },
    {
      id: 5,
      name: "DesignHub",
      description: "Collaborative design and prototyping tool",
      logo: "🎨",
      category: "Design",
      website: "https://designhub.launchspace.org",
      appStore: "https://apps.apple.com/app/designhub"
    },
    {
      id: 6,
      name: "FinanceTracker",
      description: "Personal finance management and budgeting",
      logo: "💰",
      category: "Finance",
      website: "https://financetracker.launchspace.org",
      appStore: "https://apps.apple.com/app/financetracker"
    }
  ];

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(apps.map(app => app.category)))];

  // Filter apps based on search term and category
  const filteredApps = apps.filter(app => {
    const searchTermLower = searchTerm.toLowerCase();
    
    // Only search at the beginning of app names and descriptions, not categories
    const nameMatch = app.name.toLowerCase().startsWith(searchTermLower);
    const descriptionMatch = app.description.toLowerCase().startsWith(searchTermLower);
    
    const matchesSearch = nameMatch || descriptionMatch;
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
      
      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search apps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Apps' : category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Results Count */}
      <div className="results-info">
        <p>Showing {filteredApps.length} of {apps.length} apps</p>
      </div>
      
      <div className="apps-grid">
        {filteredApps.map((app) => (
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
      
      {/* No Results Message */}
      {filteredApps.length === 0 && (
        <div className="no-results">
          <p>No apps found matching your search criteria.</p>
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Apps;