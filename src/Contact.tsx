import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Initialize EmailJS with your public key
      emailjs.init('YOUR_PUBLIC_KEY'); // You'll need to replace this with your actual EmailJS public key

      const templateParams = {
        to_email: 'upoyrazlol@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        message: formData.message,
        reply_to: formData.email
      };

      await emailjs.send(
        'YOUR_SERVICE_ID', // You'll need to replace this with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // You'll need to replace this with your EmailJS template ID
        templateParams
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setValidationErrors({});
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="info-icon">📧</div>
              <div>
                <h4>Email</h4>
                <p>uzay@launchspace.org</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <h4>Location</h4>
                <p>Princeton, NJ</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">⏰</div>
              <div>
                <h4>Response Time</h4>
                <p>Within 24 hours</p>
              </div>
            </div>
          </div>
          
          <div className="services-section">
            <h3>Our Services</h3>
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
            <h3>Send us a message</h3>
            
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
                placeholder="Tell us about your project..."
                rows={5}
                className={validationErrors.message ? 'error' : ''}
              />
              {validationErrors.message && (
                <span className="error-text">Message is required</span>
              )}
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${submitStatus === 'success' ? 'success' : ''} ${submitStatus === 'error' ? 'error' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 
               submitStatus === 'success' ? 'Message Sent!' :
               submitStatus === 'error' ? 'Send Failed - Try Again' :
               'Send Message'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="success-message">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="error-message">
                Sorry, there was an error sending your message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact; 