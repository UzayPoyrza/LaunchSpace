import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Apps from './Apps';
import Contact from './Contact';
import Career from './Career';
import VideoBackground from './VideoBackground';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';
import UnsubscribePage from './UnsubscribePage';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [flashlightSize, setFlashlightSize] = useState(350);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Handle initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Track mouse position for flashlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateFlashlightSize = () => {
      if (window.innerWidth > 1200) {
        setFlashlightSize(350);
      } else if (window.innerWidth > 768) {
        setFlashlightSize(300);
      } else if (window.innerWidth > 480) {
        setFlashlightSize(250);
      } else {
        setFlashlightSize(200);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateFlashlightSize);
    
    updateFlashlightSize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateFlashlightSize);
    };
  }, []);

  // Handle scroll-based navigation visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show nav at the top
      if (currentScrollY <= 100) {
        setIsNavVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY - 10) { // Scrolling up (with threshold)
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY + 10) { // Scrolling down (with threshold)
        setIsNavVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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

  // Update body background based on current page
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isHomePage) {
        document.body.classList.remove('black-bg');
      } else {
        document.body.classList.add('black-bg');
      }
    }, 100); // Small delay to prevent white flash

    return () => clearTimeout(timer);
  }, [isHomePage]);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`App ${isHomePage ? 'home-page' : ''}`}>
      {/* Flashlight/Spotlight Cursor Effect */}
      <div 
        className="flashlight-effect"
        style={{
          left: mousePosition.x - flashlightSize,
          top: mousePosition.y - flashlightSize,
        }}
      />
      
      {/* Video Background for non-home pages */}
      {!isHomePage && <VideoBackground />}
      
      {/* Navigation */}
      <nav className={`navbar ${!isHomePage ? 'inverted' : ''} ${isNavVisible ? 'nav-visible' : 'nav-hidden'}`}>
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
            <Link to="/" onClick={() => setIsMenuOpen(false)}>LaunchSpace</Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <Link 
              to="/apps" 
              className={location.pathname === '/apps' ? 'active' : ''}
            >
              Apps
            </Link>
            <Link 
              to="/career" 
              className={location.pathname === '/career' ? 'active' : ''}
            >
              Careers
            </Link>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              Contact
            </Link>
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
          <Link 
            to="/apps" 
            onClick={() => setIsMenuOpen(false)}
            className={location.pathname === '/apps' ? 'active' : ''}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Apps
          </Link>
          <Link 
            to="/career" 
            onClick={() => setIsMenuOpen(false)}
            className={location.pathname === '/career' ? 'active' : ''}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7L10 17L5 12" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H12" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            Careers
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsMenuOpen(false)}
            className={location.pathname === '/contact' ? 'active' : ''}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            Contact
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <section className="hero">
            <div className="hero-content">
              <h1>LaunchSpace</h1>
              <p>We build modern web & AI applications—fast, reliable, and user-first.</p>
            </div>
          </section>
        } />
        <Route path="/apps" element={<Apps />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/unsubscribe" element={<UnsubscribePage />} />
      </Routes>
      <Footer isHomePage={isHomePage} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
