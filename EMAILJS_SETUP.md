# EmailJS Setup Guide for Valentine Survey

This guide will help you set up EmailJS to receive email notifications when someone answers your Valentine survey.

## Why EmailJS?

- ✅ Works with GitHub Pages (no backend needed)
- ✅ Free tier: 200 emails/month
- ✅ Easy to set up
- ✅ No server required

## Step-by-Step Setup

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** (free)
3. Verify your email address

### 2. Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Click **Connect Account** and authorize with your Gmail
5. Copy the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Template Name:** `valentine_response`

**Subject:**
```
💝 Valentine Response - {{answer_1}}
```

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0;">💝 Valentine's Day Response</h1>
    </div>
    
    <div style="padding: 30px; background: #fff; border: 1px solid #e0e0e0; border-radius: 0 0 12px 12px;">
        <h3 style="color: #333;">Response Details</h3>
        <p><strong>From:</strong> {{submitter_name}}</p>
        <p><strong>Time:</strong> {{timestamp}}</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #333;">Answer:</h4>
            <pre style="white-space: pre-wrap; font-family: Arial;">{{answers}}</pre>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #999; font-size: 12px;">Valentine Survey - Automated Notification</p>
        </div>
    </div>
</div>
```

4. Click **Save**
5. Copy the **Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `AbCdEfGhIjKlMnOp`)
3. Copy it

### 5. Update Your Code

Edit `script.js` and replace the placeholder values:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'service_abc123',      // Your Service ID
    templateId: 'template_xyz789',    // Your Template ID
    publicKey: 'AbCdEfGhIjKlMnOp'     // Your Public Key
};
```

### 6. Test It!

1. Save your changes
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Configure EmailJS"
   git push origin main
   ```
3. Wait 1-2 minutes for GitHub Pages to deploy
4. Visit your site: `https://nakhil624.github.io/ValentineWeb/`
5. Answer the question
6. Check your email! 📧

## Template Variables Available

You can use these variables in your email template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{submitter_name}}` | Name of person | "Anonymous" |
| `{{timestamp}}` | When submitted | "2/4/2026, 4:30:00 PM" |
| `{{answers}}` | All answers formatted | "Question 1: Will you be my Valentine?\nAnswer: YES" |
| `{{answer_1}}` | First answer | "yes" or "no" |
| `{{question_1}}` | First question | "Will you be my Valentine?" |

## Troubleshooting

### Email not received?

1. **Check spam folder** - EmailJS emails sometimes go to spam
2. **Verify Service ID, Template ID, and Public Key** are correct
3. **Check EmailJS dashboard** → Logs to see if email was sent
4. **Free tier limit** - Make sure you haven't exceeded 200 emails/month

### "EmailJS not configured" warning?

- Make sure you replaced `'YOUR_SERVICE_ID'` with your actual Service ID
- Check browser console for errors

### Still not working?

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab to see if EmailJS request is being made

## Security Notes

✅ **Public Key is safe** - It's meant to be public and used in frontend code  
✅ **No credentials exposed** - EmailJS handles authentication  
✅ **Rate limited** - Free tier: 200 emails/month  

## Alternative: Upgrade EmailJS

If you need more emails:
- **Personal Plan**: $7/month - 1,000 emails
- **Professional Plan**: $15/month - 10,000 emails

## Next Steps

Once configured, your Valentine survey will:
1. ✅ Work on GitHub Pages
2. ✅ Send you email notifications
3. ✅ Show beautiful thank you messages
4. ✅ No backend server needed!

Enjoy! 💝
