/**
 * Contact Routes
 * Handles contact form submissions
 */

import { Router } from 'express';
import { sendContactEmail } from '../services/email.service.js';

const router = Router();

/**
 * POST /api/contact
 * Send a contact form email
 */
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required.',
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.',
            });
        }

        // Send email
        await sendContactEmail({ name, email, message });

        res.json({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.',
        });
    } catch (error) {
        console.error('Contact email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.',
        });
    }
});

export default router;
