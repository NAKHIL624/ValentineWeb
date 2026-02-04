# Valentine Survey - Deployment Guide

## 🚀 Quick Deploy to Netlify

Your Valentine survey is ready to deploy! Here are your options:

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI** (if not already installed):
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Deploy from the project folder**:
```bash
cd d:/Web
netlify deploy --prod
```

4. **Follow the prompts**:
   - Create & configure a new site? **Yes**
   - Team: Select your team
   - Site name: `valentine-survey-2026` (or your preferred name)
   - Publish directory: `.` (current directory)

### Option 2: Deploy via Netlify Website

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your `d:/Web` folder
4. Wait for deployment to complete
5. Get your live URL!

### Option 3: Connect to Git (Best for Updates)

1. Create a GitHub repository
2. Push your code:
```bash
cd d:/Web
git init
git add .
git commit -m "Valentine survey"
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

3. Go to Netlify → "Add new site" → "Import from Git"
4. Connect your GitHub repo
5. Netlify will auto-deploy on every push!

## 🔐 Environment Variables (Important!)

After deployment, set these environment variables in Netlify:

1. Go to Site settings → Environment variables
2. Add these variables:
   - `EMAIL_USER`: nakhilkurian246@gmail.com
   - `EMAIL_PASS`: dhalbzehogxakffm
   - `NOTIFICATION_EMAIL`: nakhilkurian246@gmail.com

**Security Note**: Your email credentials are currently in the code. For production, always use environment variables!

## 📱 Share Your Survey

After deployment, you'll get a URL like:
- `https://valentine-survey-2026.netlify.app`
- Or custom domain: `https://yourdomain.com`

Share this URL with anyone you want to send the Valentine question to!

## ✅ What Works Online

- ✅ Beautiful Valentine UI
- ✅ Yes/No question with animations
- ✅ Email notifications to you
- ✅ Anonymous responses
- ✅ Mobile responsive
- ✅ No reload issues

## 🛠️ Alternative: Deploy to Render/Railway

If you prefer a full Node.js server:

### Render.com
1. Go to https://render.com
2. Create new "Web Service"
3. Connect your GitHub repo
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables

### Railway.app
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select your repo
4. Add environment variables
5. Railway auto-detects Node.js

## 📊 Monitor Responses

All responses will be emailed to: nakhilkurian246@gmail.com

Check your inbox for notifications whenever someone answers!

## 🎉 You're All Set!

Your Valentine survey is ready to share with the world! 💝
