/**
 * Main Routes Index
 * Aggregates all route modules
 */

import { Router } from 'express';
import projectsRoutes from './projects.routes.js';
import contactRoutes from './contact.routes.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
    });
});

// Mount route modules
router.use('/projects', projectsRoutes);
router.use('/contact', contactRoutes);

export default router;
