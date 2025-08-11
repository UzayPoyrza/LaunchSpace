import React, { useState } from 'react';
import './Career.css';

function Career() {
  const [activeTab, setActiveTab] = useState('openings');

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Engineering',
      description: 'We\'re looking for a Senior Frontend Developer to join our team and help build modern, responsive web applications using React, TypeScript, and cutting-edge technologies.'
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      type: 'Full-time',
      location: 'Remote',
      department: 'AI',
      description: 'Join our AI team to develop and deploy machine learning models, work with large datasets, and create intelligent applications that solve real-world problems.'
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      type: 'Full-time',
      location: 'Remote',
      department: 'Design',
      description: 'Help us create beautiful, intuitive user experiences. You\'ll work closely with our development team to design interfaces that users love.'
    }
  ];

  return (
    <div className="career-page">
      <div className="career-header">
        <h1>Join Our Team</h1>
        <p>Build the future of web & AI applications with us</p>
      </div>

      <div className="career-content">
        <div className="career-tabs">
          <button 
            className={`tab-btn ${activeTab === 'openings' ? 'active' : ''}`}
            onClick={() => setActiveTab('openings')}
          >
            Open Positions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'culture' ? 'active' : ''}`}
            onClick={() => setActiveTab('culture')}
          >
            Our Culture
          </button>
          <button 
            className={`tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
            onClick={() => setActiveTab('benefits')}
          >
            Benefits
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'openings' && (
            <div className="job-openings">
              <h2>Current Openings</h2>
              <div className="jobs-grid">
                {jobOpenings.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-header">
                      <h3>{job.title}</h3>
                      <div className="job-meta">
                        <span className="job-type">{job.type}</span>
                        <span className="job-location">{job.location}</span>
                      </div>
                    </div>
                    <div className="job-department">{job.department}</div>
                    <p className="job-description">{job.description}</p>
                    <button className="apply-btn">Apply Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'culture' && (
            <div className="culture-section">
              <h2>Our Culture</h2>
              <div className="culture-grid">
                <div className="culture-item">
                  <h3>Innovation First</h3>
                  <p>We believe in pushing boundaries and exploring new technologies to solve complex problems.</p>
                </div>
                <div className="culture-item">
                  <h3>Remote-First</h3>
                  <p>Work from anywhere in the world. We value results over location and provide the tools you need to succeed.</p>
                </div>
                <div className="culture-item">
                  <h3>Continuous Learning</h3>
                  <p>Stay ahead of the curve with dedicated time for learning, conferences, and skill development.</p>
                </div>
                <div className="culture-item">
                  <h3>Collaboration</h3>
                  <p>We work together as a team, sharing knowledge and supporting each other's growth.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="benefits-section">
              <h2>Benefits & Perks</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <h3>Health & Wellness</h3>
                  <ul>
                    <li>Comprehensive health insurance</li>
                    <li>Mental health support</li>
                    <li>Fitness reimbursement</li>
                  </ul>
                </div>
                <div className="benefit-item">
                  <h3>Work-Life Balance</h3>
                  <ul>
                    <li>Flexible working hours</li>
                    <li>Unlimited PTO</li>
                    <li>Parental leave</li>
                  </ul>
                </div>
                <div className="benefit-item">
                  <h3>Professional Growth</h3>
                  <ul>
                    <li>Conference attendance</li>
                    <li>Learning budget</li>
                    <li>Career development</li>
                  </ul>
                </div>
                <div className="benefit-item">
                  <h3>Team & Culture</h3>
                  <ul>
                    <li>Team retreats</li>
                    <li>Equipment budget</li>
                    <li>Home office setup</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Career;
