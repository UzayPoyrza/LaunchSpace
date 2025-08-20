# Brevo Newsletter Integration Setup

This guide will help you set up the newsletter subscription functionality with Brevo (formerly Sendinblue).

## Prerequisites

1. A Brevo account with API access
2. Your domain (launchspace.org) authorized in Brevo
3. The `noreply@launchspace.org` email address configured

## Setup Steps

### 1. Get Your Brevo API Key

1. Log in to your Brevo account at https://app.brevo.com
2. Go to **Settings** > **API Keys**
3. Create a new API key or copy your existing one
4. Make sure the API key has the following permissions:
   - **Contacts**: Read, Write
   - **Transactional Emails**: Send

### 2. Create a Contact List (Optional)

1. Go to **Contacts** > **Lists** in your Brevo dashboard
2. Create a new list for newsletter subscribers (e.g., "Newsletter Subscribers")
3. Note the List ID (you'll see it in the URL or list details)

### 3. Configure Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Brevo API Configuration
BREVO_API_KEY=your_brevo_api_key_here

# Brevo List ID (optional - defaults to 2)
BREVO_LIST_ID=your_list_id_here
```

### 4. Deploy to Vercel

If you're deploying to Vercel, add these environment variables in your Vercel dashboard:

1. Go to your project settings in Vercel
2. Navigate to **Environment Variables**
3. Add the variables from step 3

### 5. Test the Integration

1. Start your development server: `npm start`
2. Go to your website's footer
3. Enter an email address and click "Subscribe"
4. Check that:
   - The contact is added to your Brevo contacts
   - A welcome email is sent from `noreply@launchspace.org`
   - The success message appears on the website

## How It Works

1. **User subscribes**: When someone enters their email in the footer, it calls the `/api/subscribe` endpoint
2. **Add to Brevo**: The API adds the contact to your Brevo contact list
3. **Send welcome email**: A welcome email is automatically sent from `noreply@launchspace.org`
4. **User feedback**: The website shows a success message

## Customization

### Welcome Email Template

You can customize the welcome email by editing the `welcomeEmailData` object in `api/subscribe.js`. The current template includes:

- Welcome message with LaunchSpace branding
- What to expect from the newsletter
- Contact information
- Professional styling

### Contact Attributes

The integration automatically adds these attributes to contacts:
- `SUBSCRIPTION_DATE`: When they subscribed
- `SOURCE`: Set to "Website Footer"

### List Management

- Contacts are added to the list specified by `BREVO_LIST_ID`
- If a contact already exists, they're updated (not duplicated)
- You can manage your contact list in the Brevo dashboard

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your API key is correct and has the right permissions
2. **List ID Error**: Verify the list ID exists in your Brevo account
3. **Email Not Sending**: Check that `noreply@launchspace.org` is authorized in Brevo
4. **CORS Error**: The API includes CORS headers, but make sure your domain is allowed

### Debugging

Check the browser console and server logs for error messages. The API includes detailed error logging.

## Security Notes

- Never commit your API key to version control
- Use environment variables for sensitive data
- The API includes input validation and error handling
- CORS is configured to allow your domain only

## Support

If you need help with the Brevo integration, check their documentation at https://developers.brevo.com/ 