import React, { useState } from 'react';
import './Apps.css';

function Apps() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const apps = [
    {
      id: 1,
      name: "Neurotype",
      description: "A science based meditation app, designed to help especially neurodivergent people",
      logo: "🧠",
      category: "Productivity",
      website: "https://neurotypeapp.com",
      appStore: "https://apps.apple.com/app/neurotype"
    },
    {
      id: 2,
      name: "Coming Soon",
      description: "",
      logo: "",
      category: "Analytics"
    },
    {
      id: 3,
      name: "Coming Soon",
      description: "",
      logo: "",
      category: "Storage"
    },
    {
      id: 4,
      name: "Coming Soon",
      description: "",
      logo: "",
      category: "Development"
    },
    {
      id: 5,
      name: "Coming Soon",
      description: "",
      logo: "",
      category: "Design"
    },
    {
      id: 6,
      name: "Coming Soon",
      description: "",
      logo: "",
      category: "Finance"
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
            className={`app-card ${app.name === "Coming Soon" ? "coming-soon" : ""}`}
          >
            {app.name === "Coming Soon" ? (
              // Coming Soon card layout
              <div className="coming-soon-content">
                <h3>{app.name}</h3>
                <span className="app-category">{app.category}</span>
              </div>
            ) : (
              // Regular app card layout
              <>
                <div className="app-logo">
                  <span className="app-icon">{app.logo}</span>
                </div>
                <div className="app-info">
                  <h3>{app.name}</h3>
                  <p className="app-description">{app.description}</p>
                  <span className="app-category">{app.category}</span>
                </div>
              </>
            )}
            
            {/* Action buttons only for non-coming soon apps */}
            {app.name !== "Coming Soon" && (
              <>
                {/* Desktop Hover Actions - Split Design */}
                <div className="app-actions-desktop">
                  <div className="split-top">
                    <button 
                      className="action-btn website-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(app.website, '_blank');
                      }}
                    >
                      <span className="btn-icon">🌐</span>
                      Visit Website
                    </button>
                  </div>
                  <div className="split-bottom">
                    <button 
                      className="action-btn appstore-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(app.appStore, '_blank');
                      }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(app.website, '_blank');
                    }}
                  >
                    <span className="btn-icon">🌐</span>
                    Visit Website
                  </button>
                  <button 
                    className="action-btn appstore-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(app.appStore, '_blank');
                    }}
                  >
                    <span className="btn-icon">📱</span>
                    Visit in App Store
                  </button>
                </div>
              </>
            )}
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