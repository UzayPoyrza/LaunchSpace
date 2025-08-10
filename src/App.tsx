import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="/">LaunchSpace</a>
          </div>
          <div className="nav-links">
            <a href="/apps">Apps</a>
            <a href="/career">Careers</a>
            <a href="/contact">Contact</a>
          </div>
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
