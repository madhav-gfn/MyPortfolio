/**
 * Application Configuration
 * Centralized configuration management
 */

export const config = {
    // Server
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',

    // GitHub
    github: {
        username: process.env.GITHUB_USERNAME,
        pat: process.env.GITHUB_PAT,
    },

    // Database
    mongoUri: process.env.MONGODB_URI,

    // CORS
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

export default config;
