/**
 * Projects Routes
 * Defines API endpoints for projects
 */

import { Router } from 'express';
import { getAllProjects, refreshProjects } from '../controllers/projects.controller.js';

const router = Router();

// GET /api/projects - Get all portfolio projects
router.get('/', getAllProjects);

// POST /api/projects/refresh - Refresh projects from GitHub
router.post('/refresh', refreshProjects);

export default router;
