# Production Deployment Guide

Your contact form is now ready for production deployment! Here's how to deploy it to various platforms.

## ✅ **What's Ready:**

- ✅ Frontend automatically detects production vs development
- ✅ Backend server configured for production
- ✅ Environment variables properly set up
- ✅ Contact form sends emails to `contact@launchspace.org`

## 🚀 **Deployment Options:**

### **Option 1: Vercel (Recommended - Easiest)**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - `BREVO_API_KEY=your_brevo_api_key`
   - `NODE_ENV=production`

4. **Vercel will automatically:**
   - Build your React app
   - Deploy your Express server as serverless functions
   - Handle routing between frontend and backend

### **Option 2: Railway (Full-stack)**

1. **Go to [Railway.app](https://railway.app/)**
2. **Connect your GitHub repository**
3. **Set Environment Variables:**
   - `BREVO_API_KEY=your_brevo_api_key`
   - `NODE_ENV=production`
4. **Deploy automatically**

### **Option 3: Heroku**

1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set BREVO_API_KEY=your_brevo_api_key
   heroku config:set NODE_ENV=production
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

## 🔧 **Pre-deployment Checklist:**

### **1. Test Production Build Locally:**
```bash
npm run build
npm run server
```

### **2. Verify Environment Variables:**
- ✅ `BREVO_API_KEY` is set
- ✅ `NODE_ENV=production` will be set by hosting platform

### **3. Test Contact Form:**
- ✅ Form validation works
- ✅ Email sends to `contact@launchspace.org`
- ✅ Success/error messages display correctly

## 🌐 **After Deployment:**

### **1. Test Your Live Site:**
- Visit your deployed URL
- Navigate to the contact page
- Submit a test message
- Check if email is received at `contact@launchspace.org`

### **2. Monitor Logs:**
- Check hosting platform logs for any errors
- Verify Brevo API calls are successful

### **3. Set Up Custom Domain (Optional):**
- Configure your custom domain in your hosting platform
- Update DNS settings

## 🔒 **Security Notes:**

- ✅ API key is stored securely in environment variables
- ✅ No sensitive data in frontend code
- ✅ CORS is properly configured
- ✅ Form validation prevents spam

## 📧 **Email Configuration:**

- **Recipient:** `contact@launchspace.org`
- **Service:** Brevo API
- **Format:** HTML email with form data
- **Subject:** "New Contact Form Message from [Name]"

## 🆘 **Troubleshooting:**

### **If emails don't send:**
1. Check Brevo API key is correct
2. Verify `contact@launchspace.org` is a valid email
3. Check hosting platform logs
4. Test Brevo API key in Brevo dashboard

### **If form shows errors:**
1. Check browser console for errors
2. Verify backend server is running
3. Check CORS configuration
4. Ensure environment variables are set

## 🎉 **You're Ready to Deploy!**

Your contact form will work perfectly in production. The code automatically detects the environment and uses the appropriate API endpoints. 