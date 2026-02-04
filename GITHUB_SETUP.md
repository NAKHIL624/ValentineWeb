# GitHub Setup Guide

## Prerequisites
- Git installed on your system
- GitHub account created
- Email credentials (Gmail App Password)

## Step 1: Create .env File

**IMPORTANT:** Before running the server, you must create a `.env` file with your email credentials.

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   EMAIL_USER=nakhilkurian246@gmail.com
   EMAIL_PASS=dhalbzehogxakffm
   NOTIFICATION_EMAIL=nakhilkurian246@gmail.com
   PORT=3000
   ```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Test Locally

```bash
npm start
```

Visit `http://localhost:3000` to test the application.

## Step 4: Push to GitHub

The repository is already initialized. To push your changes:

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Updated email configuration to use environment variables"

# Push to GitHub
git push origin main
```

## Step 5: Deploy (Optional)

### Option A: Deploy to Render, Railway, or Heroku

1. Create account on your chosen platform
2. Connect your GitHub repository
3. Add environment variables in the platform's dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `NOTIFICATION_EMAIL`
   - `PORT` (usually auto-configured)
4. Deploy!

### Option B: Deploy to VPS

1. SSH into your server
2. Clone the repository
3. Create `.env` file with your credentials
4. Install dependencies: `npm install`
5. Use PM2 to run the server:
   ```bash
   npm install -g pm2
   pm2 start server.js --name valentine-survey
   pm2 save
   pm2 startup
   ```

## Security Checklist

✅ `.env` file is in `.gitignore`  
✅ Email credentials use environment variables  
✅ No sensitive data in source code  
✅ `.env.example` provided for reference  

## Troubleshooting

### Email not sending?
- Check that 2-Step Verification is enabled on Gmail
- Verify you're using an App Password, not your regular password
- Check `.env` file has correct credentials
- Look for errors in console output

### Can't push to GitHub?
```bash
# Check remote URL
git remote -v

# If not set, add it
git remote add origin https://github.com/YOUR_USERNAME/ValentineWeb.git
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_USER` | Gmail address to send from | `your@gmail.com` |
| `EMAIL_PASS` | Gmail App Password | `abcd efgh ijkl mnop` |
| `NOTIFICATION_EMAIL` | Where to receive notifications | `your@gmail.com` |
| `PORT` | Server port | `3000` |
