const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Step 1: Check if contact already exists
    const checkContactUrl = `https://api.brevo.com/v3/contacts/${encodeURIComponent(email.trim())}`;
    
    console.log('Checking if contact exists:', email);

    const checkResponse = await fetch(checkContactUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      }
    });

    let isExistingContact = false;
    let isInList = false;
    
    if (checkResponse.ok) {
      const contactData = await checkResponse.json();
      console.log('Contact already exists:', contactData);
      isExistingContact = true;
      
      // Check if they're already in the newsletter list
      const listId = parseInt(process.env.BREVO_LIST_ID) || 2;
      isInList = contactData.listIds && contactData.listIds.includes(listId);
      
      if (isInList) {
        return res.status(409).json({ 
          error: 'This email is already subscribed to our newsletter.',
          alreadySubscribed: true
        });
      }
    }

    // Step 2: Add contact to Brevo (if new) or update existing contact
    const addContactUrl = 'https://api.brevo.com/v3/contacts';
    
    const contactData = {
      email: email.trim(),
      attributes: {
        SUBSCRIPTION_DATE: new Date().toISOString(),
        SOURCE: 'Website Footer'
      },
      listIds: [parseInt(process.env.BREVO_LIST_ID) || 2],
      updateEnabled: true
    };

    console.log('Adding/updating contact to Brevo:', email);

    const contactResponse = await fetch(addContactUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify(contactData)
    });

    if (!contactResponse.ok) {
      const errorData = await contactResponse.json();
      console.error('Brevo contact API error:', errorData);
      throw new Error(`Failed to add contact to Brevo: ${contactResponse.status} - ${JSON.stringify(errorData)}`);
    }

    // Step 3: Send welcome email (for new subscribers and resubscribers)
    if (!isExistingContact || !isInList) {
      const welcomeEmailUrl = 'https://api.brevo.com/v3/smtp/email';

      // Create unsubscribe link
      const unsubscribeLink = `${process.env.NODE_ENV === 'production' ? 'https://launchspace.org' : 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(email.trim())}`;

      const welcomeEmailData = {
        sender: {
          name: 'LaunchSpace',
          email: 'noreply@launchspace.org'
        },
        to: [
          {
            email: email.trim(),
            name: email.split('@')[0]
          }
        ],
        subject: 'Welcome to LaunchSpace! 🚀',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin-bottom: 10px;">Welcome to LaunchSpace! 🚀</h1>
              <p style="color: #666; font-size: 18px;">Thank you for subscribing to our newsletter!</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">What to expect:</h2>
              <ul style="color: #555; line-height: 1.6;">
                <li>🚀 Latest updates on our projects and innovations</li>
                <li>💡 Industry insights and tech trends</li>
                <li>🎯 Exclusive content and behind-the-scenes looks</li>
                <li>📅 Event announcements and opportunities</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666;">Stay tuned for exciting updates from the LaunchSpace team!</p>
              <p style="color: #999; font-size: 14px; margin-top: 20px;">
                If you have any questions, feel free to reach out to us at 
                <a href="mailto:contact@launchspace.org" style="color: #007bff;">contact@launchspace.org</a>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin-bottom: 10px;">
                © 2025 LaunchSpace LLC. All rights reserved.
              </p>
              <p style="color: #999; font-size: 11px;">
                <a href="${unsubscribeLink}" style="color: #999; text-decoration: underline;">
                  Unsubscribe from this newsletter
                </a>
              </p>
            </div>
          </div>
        `,
        textContent: `
          Welcome to LaunchSpace! 🚀
          
          Thank you for subscribing to our newsletter!
          
          What to expect:
          - 🚀 Latest updates on our projects and innovations
          - 💡 Industry insights and tech trends
          - 🎯 Exclusive content and behind-the-scenes looks
          - 📅 Event announcements and opportunities
          
          Stay tuned for exciting updates from the LaunchSpace team!
          
          If you have any questions, feel free to reach out to us at contact@launchspace.org
          
          © 2025 LaunchSpace LLC. All rights reserved.
          
          To unsubscribe, visit: ${unsubscribeLink}
        `
      };

      console.log('Sending welcome email to:', email);

      const emailResponse = await fetch(welcomeEmailUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify(welcomeEmailData)
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('Brevo email API error:', errorData);
        throw new Error(`Failed to send welcome email: ${emailResponse.status} - ${JSON.stringify(errorData)}`);
      }

      console.log('Welcome email sent successfully');
    }

    console.log('Successfully subscribed:', email);
    res.json({ 
      success: true, 
      message: isExistingContact 
        ? 'Successfully subscribed to newsletter!' 
        : 'Successfully subscribed to newsletter! Welcome email sent.',
      isNewSubscriber: !isExistingContact
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      error: 'Failed to subscribe to newsletter. Please try again later.' 
    });
  }
}; 