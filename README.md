# Question Survey Website

A modern, responsive website with yes/no questions that sends you notifications when users answer.

## Features

- ✨ Beautiful, modern UI with gradient background
- 📱 Fully responsive design
- 🔔 Real-time notifications (console + email)
- ✅ Visual feedback for selected answers
- 🎯 Clean, intuitive user experience

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Notifications (Optional)

To receive email notifications, create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and update with your credentials:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
NOTIFICATION_EMAIL=your_email@gmail.com
PORT=3000
```

**To get a Gmail App Password:**
1. Go to Google Account settings
2. Enable 2-Step Verification
3. Go to Security → App Passwords
4. Generate a new app password for "Mail"
5. Use that password in the `.env` file

**⚠️ Security Note:** Never commit your `.env` file to Git. It's already in `.gitignore`.

### 3. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

## How It Works

1. **Frontend**: Users see questions with Yes/No buttons
2. **User clicks**: Answer is sent to the backend immediately
3. **Notifications**: You receive:
   - Console notification (always)
   - Email notification (if configured)
4. **Completion**: After all questions are answered, user sees thank you message

## Customizing Questions

Edit the `questions` array in `script.js`:

```javascript
const questions = [
    "Your first question?",
    "Your second question?",
    "Your third question?"
];
```

## Notification Methods

### Console Notifications (Default)
Always enabled. Check your terminal/console for real-time notifications.

### Email Notifications (Optional)
Configure email settings in `server.js` to receive email alerts.

### Alternative: Webhook Notifications
Replace the email code with a webhook to services like:
- Discord
- Slack
- Telegram
- Custom webhook endpoint

## File Structure

```
d:/Web/
├── index.html       # Main HTML page
├── styles.css       # Styling
├── script.js        # Frontend logic
├── server.js        # Backend server
├── package.json     # Dependencies
└── README.md        # This file
```

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Notifications**: Nodemailer (email), Console logging
- **Styling**: Modern CSS with gradients and animations

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

Enjoy your survey site! 🎉
