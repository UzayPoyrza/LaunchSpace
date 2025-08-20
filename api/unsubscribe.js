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

  // Allow both GET and POST requests
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get email from query params (GET) or body (POST)
    const email = req.method === 'GET' ? req.query.email : req.body.email;

    // Validate email
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    console.log('Processing unsubscribe request for:', email);

    // First, check if the contact exists and is subscribed
    const checkContactUrl = `https://api.brevo.com/v3/contacts/${encodeURIComponent(email.trim())}`;
    
    console.log('Checking if contact is subscribed:', email);

    const checkResponse = await fetch(checkContactUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      }
    });

    if (!checkResponse.ok) {
      return res.status(404).json({ 
        error: 'Email address not found in our system.' 
      });
    }

    const contactData = await checkResponse.json();
    const listId = parseInt(process.env.BREVO_LIST_ID) || 2;
    const isInList = contactData.listIds && contactData.listIds.includes(listId);

    if (!isInList) {
      return res.status(400).json({ 
        error: 'This email address is not currently subscribed to our newsletter.' 
      });
    }

    console.log('Contact is subscribed, proceeding with unsubscribe');

    // Remove contact from the newsletter list
    const removeFromListUrl = `https://api.brevo.com/v3/contacts/lists/${listId}/contacts/remove`;

    const removeData = {
      emails: [email.trim()]
    };

    console.log('Removing contact from list:', listId);

    const removeResponse = await fetch(removeFromListUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify(removeData)
    });

    if (!removeResponse.ok) {
      const errorData = await removeResponse.json();
      console.error('Brevo remove from list API error:', errorData);
      
      // If contact is not in the list, that's fine
      if (removeResponse.status !== 400) {
        throw new Error(`Failed to remove contact from list: ${removeResponse.status} - ${JSON.stringify(errorData)}`);
      }
    }

    console.log('Successfully unsubscribed:', email);

    // Send confirmation email
    const confirmationEmailUrl = 'https://api.brevo.com/v3/smtp/email';

    const confirmationEmailData = {
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
      subject: 'You have been unsubscribed from LaunchSpace Newsletter',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin-bottom: 10px;">Unsubscribed Successfully</h1>
            <p style="color: #666; font-size: 18px;">You have been unsubscribed from our newsletter.</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #555; line-height: 1.6;">
              We're sorry to see you go! You will no longer receive our newsletter updates.
            </p>
            <p style="color: #555; line-height: 1.6;">
              If you change your mind, you can always resubscribe by visiting our website and entering your email address again.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666;">Thank you for being part of our community!</p>
            <p style="color: #999; font-size: 14px; margin-top: 20px;">
              If you have any questions, feel free to reach out to us at 
              <a href="mailto:contact@launchspace.org" style="color: #007bff;">contact@launchspace.org</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px;">
              © 2025 LaunchSpace LLC. All rights reserved.
            </p>
          </div>
        </div>
      `,
      textContent: `
        Unsubscribed Successfully
        
        You have been unsubscribed from our newsletter.
        
        We're sorry to see you go! You will no longer receive our newsletter updates.
        
        If you change your mind, you can always resubscribe by visiting our website and entering your email address again.
        
        Thank you for being part of our community!
        
        If you have any questions, feel free to reach out to us at contact@launchspace.org
        
        © 2025 LaunchSpace LLC. All rights reserved.
      `
    };

    console.log('Sending unsubscribe confirmation email to:', email);

    let emailSent = false;
    let emailError = null;

    try {
      const emailResponse = await fetch(confirmationEmailUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify(confirmationEmailData)
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('Brevo email API error:', errorData);
        emailError = `Email sending failed: ${emailResponse.status} - ${JSON.stringify(errorData)}`;
      } else {
        console.log('Unsubscribe confirmation email sent successfully');
        emailSent = true;
      }
    } catch (emailErr) {
      console.error('Email sending error:', emailErr);
      emailError = `Email sending error: ${emailErr.message}`;
    }

    // Return success response with email status
    res.json({ 
      success: true, 
      message: emailSent 
        ? 'Successfully unsubscribed from newsletter. Confirmation email sent.' 
        : 'Successfully unsubscribed from newsletter. Confirmation email could not be sent.',
      emailSent: emailSent,
      emailError: emailError
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ 
      error: 'Failed to unsubscribe. Please try again later.' 
    });
  }
}; 