import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: boolean}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
    
    // Reset submit status when user starts typing (allows multiple submissions)
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: boolean} = {};
    
    if (!formData.name.trim()) {
      errors.name = true;
    }
    if (!formData.email.trim()) {
      errors.email = true;
    }
    if (!formData.message.trim()) {
      errors.message = true;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }
    
    const subject = encodeURIComponent(`Contact Form: ${formData.name}${formData.company ? ` (${formData.company})` : ''}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'Not provided'}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:contact@launchspace.org?subject=${subject}&body=${body}`;

    setSubmitStatus('success');
    setFormData({ name: '', email: '', company: '', message: '' });
    setValidationErrors({});
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>Ready to build something amazing? Let's discuss your next project.</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-section">
            <h3>Contact Information</h3>
            <div className="info-item">
              <div className="info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>contact@launchspace.org</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h4>Location</h4>
                <p>Princeton, NJ</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h4>Response Time</h4>
                <p>Within 24 hours</p>
              </div>
            </div>
          </div>
          
          <div className="services-section">
            <h3>Services</h3>
            <ul>
              <li>Web Application Development</li>
              <li>AI & Machine Learning Solutions</li>
              <li>Mobile App Development</li>
              <li>UI/UX Design</li>
              <li>Cloud Infrastructure</li>
            </ul>
          </div>
        </div>
        
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send me a message</h3>
            
            <div className={`form-group ${validationErrors.name ? 'error' : ''}`}>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className={validationErrors.name ? 'error' : ''}
              />
              {validationErrors.name && (
                <span className="error-text">Name is required</span>
              )}
            </div>
            
            <div className={`form-group ${validationErrors.email ? 'error' : ''}`}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className={validationErrors.email ? 'error' : ''}
              />
              {validationErrors.email && (
                <span className="error-text">Email is required</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
              />
            </div>
            
            <div className={`form-group ${validationErrors.message ? 'error' : ''}`}>
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project..."
                rows={5}
                className={validationErrors.message ? 'error' : ''}
              />
              {validationErrors.message && (
                <span className="error-text">Message is required</span>
              )}
            </div>
            
            <button
              type="submit"
              className={`submit-btn ${submitStatus === 'success' ? 'success' : ''}`}
            >
              {submitStatus === 'success' ? 'Opening Email Client...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="success-message">
                Your email client should have opened with the message pre-filled. Just hit send!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact; 