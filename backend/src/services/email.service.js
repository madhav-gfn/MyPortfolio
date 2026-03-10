/**
 * Email Service
 * Sends emails using Nodemailer with Gmail SMTP
 */

import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: config.email.user,
        pass: config.email.pass,
    },
    // Force IPv4 to avoid ENETUNREACH issues on Render
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * Send a contact form email
 * @param {Object} params
 * @param {string} params.name - Sender's name
 * @param {string} params.email - Sender's email
 * @param {string} params.message - Message content
 */
export const sendContactEmail = async ({ name, email, message }) => {
    const mailOptions = {
        from: `"Portfolio Contact" <${config.email.user}>`,
        to: config.email.user,
        replyTo: email,
        subject: `Portfolio Contact from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">
                    New Contact Form Message
                </h2>
                <div style="padding: 20px 0;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <hr style="border: 1px solid #eee; margin: 15px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</p>
                </div>
                <p style="color: #999; font-size: 12px; margin-top: 20px;">
                    Sent from your portfolio contact form
                </p>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
};

export default { sendContactEmail };
