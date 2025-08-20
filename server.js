const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, from, name, company, message } = req.body;

    // Validate required fields
    if (!to || !from || !name || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Brevo API endpoint - try v3 first, fallback to v2
    const brevoUrl = 'https://api.brevo.com/v3/smtp/email';

    const emailData = {
      sender: {
        name: name,
        email: from
      },
      to: [
        {
          email: to,
          name: 'LaunchSpace Contact'
        }
      ],
      subject: `New Contact Form Message from ${name}`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${from}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      textContent: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${from}
        Company: ${company || 'Not provided'}
        Message: ${message}
      `
    };

    console.log('Sending email data to Brevo:', JSON.stringify(emailData, null, 2));
    console.log('Using API key:', process.env.BREVO_API_KEY ? `Present (starts with: ${process.env.BREVO_API_KEY.substring(0, 10)}...)` : 'Missing');

    const response = await fetch(brevoUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      console.error('Response status:', response.status);
      console.error('Response headers:', response.headers);
      throw new Error(`Failed to send email via Brevo: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 