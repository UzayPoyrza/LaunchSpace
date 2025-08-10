import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when screen gets bigger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1"/>
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
              <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.8"/>
              <circle cx="16" cy="6" r="1" fill="currentColor" opacity="0.6"/>
              <circle cx="6" cy="16" r="0.8" fill="currentColor" opacity="0.7"/>
            </svg>
            <a href="/">LaunchSpace</a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <a href="/apps">Apps</a>
            <a href="/career">Careers</a>
            <a href="/contact">Contact</a>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="hamburger-menu">
            <button 
              className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <a href="/apps" onClick={() => setIsMenuOpen(false)}>Apps</a>
          <a href="/career" onClick={() => setIsMenuOpen(false)}>Careers</a>
          <a href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>LaunchSpace</h1>
          <p>We build modern web & AI applications—fast, reliable, and user-first.</p>
        </div>
      </section>
    </div>
  );
}

export default App;