import React, { useState, useEffect } from 'react';
import './UnsubscribePage.css';

function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    // Get email from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    
    if (emailFromUrl) {
      setEmail(decodeURIComponent(emailFromUrl));
      // Auto-unsubscribe if email is provided in URL
      handleUnsubscribe(decodeURIComponent(emailFromUrl));
    }
    
    setIsLoading(false);
  }, []);

  const handleUnsubscribe = async (emailToUnsubscribe: string) => {
    setIsUnsubscribing(true);
    setError('');
    
    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToUnsubscribe }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsUnsubscribed(true);
        setEmailSent(data.emailSent || false);
        setEmailError(data.emailError || '');
      } else {
        setError(data.error || 'Failed to unsubscribe. Please try again.');
      }
    } catch (err) {
      console.error('Unsubscribe error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsUnsubscribing(false);
    }
  };

  const handleManualUnsubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      handleUnsubscribe(email.trim());
    }
  };

  if (isLoading) {
    return (
      <div className="unsubscribe-page">
        <div className="unsubscribe-container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="unsubscribe-page">
      <div className="unsubscribe-container">
        <div className="logo-section">
          <div className="logo-icon">
            <svg className="logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1"/>
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
              <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.8"/>
              <circle cx="16" cy="6" r="1" fill="currentColor" opacity="0.6"/>
              <circle cx="6" cy="16" r="0.8" fill="currentColor" opacity="0.7"/>
            </svg>
          </div>
          <h1 className="logo-text">LaunchSpace</h1>
        </div>

        <div className="unsubscribe-content">
          {isUnsubscribed ? (
            <div className="success-section">
              <div className="success-icon">✓</div>
              <h2>Successfully Unsubscribed</h2>
              <p>You have been unsubscribed from our newsletter.</p>
              <p>We're sorry to see you go! You will no longer receive our newsletter updates.</p>
              <p>If you change your mind, you can always resubscribe by visiting our website and entering your email address again.</p>
              
              {emailSent && (
                <div className="email-status success">
                  ✓ Confirmation email sent successfully
                </div>
              )}
              
              {!emailSent && emailError && (
                <div className="email-status error">
                  ⚠️ Confirmation email could not be sent: {emailError}
                </div>
              )}
              
              <div className="action-buttons">
                <a href="/" className="btn btn-primary">Return to Homepage</a>
                <button 
                  onClick={() => window.location.href = '/#newsletter'} 
                  className="btn btn-secondary"
                >
                  Resubscribe
                </button>
              </div>
            </div>
          ) : (
            <div className="unsubscribe-form">
              <h2>Unsubscribe from Newsletter</h2>
              <p>Enter your email address to unsubscribe from our newsletter.</p>
              
              <form onSubmit={handleManualUnsubscribe}>
                <div className="email-input-group">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="email-input"
                    disabled={isUnsubscribing}
                  />
                  <button 
                    type="submit" 
                    className="unsubscribe-btn"
                    disabled={isUnsubscribing}
                  >
                    {isUnsubscribing ? 'Unsubscribing...' : 'Unsubscribe'}
                  </button>
                </div>
              </form>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
              <div className="links">
                <a href="/" className="link">Return to Homepage</a>
                <span className="separator">•</span>
                <a href="/#newsletter" className="link">Resubscribe</a>
              </div>
            </div>
          )}
        </div>


      </div>
    </div>
  );
}

export default UnsubscribePage; 