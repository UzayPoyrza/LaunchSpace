# Brevo Email Setup Guide for Contact Form

The contact form is now configured to send emails to `contact@launchspace.org` using Brevo's API. This is a more direct and secure approach than using third-party services like EmailJS.

## Setup Steps:

### 1. Get Your Brevo API Key
1. Log into your [Brevo account](https://app.brevo.com/)
2. Go to **Settings** → **API Keys**
3. Create a new API key or copy your existing one
4. Note down your **API Key**

### 2. Configure Environment Variables
1. Create a `.env` file in your project root (copy from `env.example`)
2. Add your Brevo API key:
```
BREVO_API_KEY=your_actual_brevo_api_key_here
```

### 3. Install Dependencies
Run the following command to install the required packages:
```bash
npm install
```

### 4. Start the Development Server
Run both the React app and the backend server:
```bash
npm run dev
```

This will start:
- React app on `http://localhost:3000`
- Backend server on `http://localhost:3001`

## How It Works:

1. **Frontend**: The contact form sends data to `/api/send-email`
2. **Backend**: Express server receives the data and forwards it to Brevo's API
3. **Brevo**: Sends the email to `contact@launchspace.org`
4. **Response**: Success/error message is returned to the user

## Email Format:
The emails will include:
- **Subject**: "New Contact Form Message from [Name]"
- **Content**: Name, email, company, and message in a formatted HTML email

## Current Configuration:
- ✅ Email recipient: `contact@launchspace.org`
- ✅ Form validation implemented
- ✅ Success/error handling implemented
- ✅ Brevo API integration ready
- ⚠️ API key needs to be configured

## Testing:
Once configured, you can test the form by:
1. Starting the development server: `npm run dev`
2. Filling out the contact form
3. Submitting the message
4. Checking if the email is received at `contact@launchspace.org`

## Security Notes:
- API key is stored securely in environment variables
- No sensitive credentials are exposed in the frontend code
- Brevo handles email delivery securely
- CORS is configured for local development

## Production Deployment:
For production, you'll need to:
1. Set up environment variables on your hosting platform
2. Configure the server to run on your hosting platform
3. Update the frontend API calls to use your production server URL 