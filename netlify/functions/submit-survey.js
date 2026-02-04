const nodemailer = require('nodemailer');

const EMAIL_CONFIG = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'nakhilkurian246@gmail.com',
        pass: process.env.EMAIL_PASS || 'dhalbzehogxakffm'
    }
};

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'nakhilkurian246@gmail.com';

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { submitterName, submitterEmail, answers, timestamp } = JSON.parse(event.body);
        const clientIP = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'Unknown';

        console.log('\n📋 NEW SURVEY SUBMISSION!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`👤 Submitted by: ${submitterName}`);
        console.log(`📧 Email: ${submitterEmail}`);
        console.log(`🌐 IP Address: ${clientIP}`);
        console.log(`⏰ Time: ${new Date(timestamp).toLocaleString()}`);
        console.log('\n📝 Answers:');
        answers.forEach(item => {
            console.log(`   ${item.questionNumber}. ${item.question}`);
            console.log(`      → ${item.answer.toUpperCase()}`);
        });
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        const transporter = nodemailer.createTransport(EMAIL_CONFIG);

        const answersHTML = answers.map(item => `
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid ${item.answer === 'yes' ? '#10b981' : '#ef4444'};">
                <p style="margin: 5px 0; font-weight: 600; color: #333;">Question ${item.questionNumber}:</p>
                <p style="margin: 5px 0; font-size: 15px; color: #555;">${item.question}</p>
                <p style="margin: 5px 0;">
                    <strong>Answer:</strong> 
                    <span style="color: ${item.answer === 'yes' ? '#10b981' : '#ef4444'}; font-weight: bold; text-transform: uppercase;">
                        ${item.answer}
                    </span>
                </p>
            </div>
        `).join('');

        const mailOptions = {
            from: EMAIL_CONFIG.auth.user,
            to: NOTIFICATION_EMAIL,
            subject: `💝 Valentine Response from ${submitterName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">💝 Valentine's Day Response</h1>
                    </div>
                    
                    <div style="padding: 30px; background: #fff; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 12px 12px;">
                        <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <h3 style="margin: 0 0 15px 0; color: #333;">👤 Submitter Information</h3>
                            <p style="margin: 8px 0; color: #555;"><strong>Name:</strong> ${submitterName}</p>
                            <p style="margin: 8px 0; color: #555;"><strong>Email:</strong> ${submitterEmail}</p>
                            <p style="margin: 8px 0; color: #555;"><strong>IP Address:</strong> ${clientIP}</p>
                            <p style="margin: 8px 0; color: #666; font-size: 14px;"><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
                        </div>
                        
                        <h3 style="color: #333; margin-bottom: 20px;">💕 Response</h3>
                        ${answersHTML}
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center; color: #999; font-size: 13px;">
                            <p>Valentine Survey - Automated Notification</p>
                        </div>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent successfully!');

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ success: true, message: 'Survey submitted successfully' })
        };

    } catch (error) {
        console.error('❌ Error:', error.message);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};
