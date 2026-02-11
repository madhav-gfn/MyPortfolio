/**
 * Projects Controller
 * Handles HTTP requests for projects endpoints
 */

import { fetchPortfolioProjects } from '../services/github.service.js';

/**
 * Get all portfolio projects from GitHub
 * @route GET /api/projects
 */
export const getAllProjects = async (req, res) => {
    try {
        const username = process.env.GITHUB_USERNAME;
        const pat = process.env.GITHUB_PAT;

        if (!username) {
            return res.status(500).json({
                success: false,
                message: 'GitHub username not configured on server',
            });
        }

        const projects = await fetchPortfolioProjects(username, pat);

        res.json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        console.error('Error fetching projects:', error.message);

        // Check for rate limit error
        if (error.message.includes('rate limit')) {
            return res.status(429).json({
                success: false,
                message: 'GitHub API rate limit exceeded. Please try again later.',
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch projects',
        });
    }
};

/**
 * Refresh projects cache (for future caching implementation)
 * @route POST /api/projects/refresh
 */
export const refreshProjects = async (req, res) => {
    try {
        const username = process.env.GITHUB_USERNAME;
        const pat = process.env.GITHUB_PAT;

        if (!username) {
            return res.status(500).json({
                success: false,
                message: 'GitHub username not configured on server',
            });
        }

        // Re-fetch projects
        const projects = await fetchPortfolioProjects(username, pat);

        res.json({
            success: true,
            message: 'Projects refreshed successfully',
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        console.error('Error refreshing projects:', error.message);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to refresh projects',
        });
    }
};
