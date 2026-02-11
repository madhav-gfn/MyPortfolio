/**
 * Portfolio Backend Server
 * Main entry point for the Express application
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
// import { connectDB } from './config/database.js'; // Uncomment when using MongoDB

const app = express();

// ===================
// Middleware
// ===================

// CORS - Allow frontend to access API
app.use(cors({
    origin: [config.frontendUrl, 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Request logging (development only)
if (config.nodeEnv === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// ===================
// Routes
// ===================

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Portfolio Backend API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            projects: '/api/projects',
            refreshProjects: '/api/projects/refresh (POST)',
        },
    });
});

// ===================
// Error Handling
// ===================

app.use(notFoundHandler);
app.use(errorHandler);

// ===================
// Server Startup
// ===================

const startServer = async () => {
    try {
        // Connect to database (uncomment when using MongoDB)
        // await connectDB();

        app.listen(config.port, () => {
            console.log('\n🚀 Portfolio Backend Server Started');
            console.log('================================');
            console.log(`📍 Environment: ${config.nodeEnv}`);
            console.log(`🌐 Server URL: http://localhost:${config.port}`);
            console.log(`📦 API Base: http://localhost:${config.port}/api`);
            console.log(`👤 GitHub User: ${config.github.username || 'Not configured'}`);
            console.log(`🔑 GitHub PAT: ${config.github.pat ? 'Configured ✓' : 'Not configured ⚠️'}`);
            console.log('================================\n');

            if (!config.github.pat) {
                console.log('⚠️  Warning: GitHub PAT not configured.');
                console.log('   Rate limit: 60 requests/hour (unauthenticated)');
                console.log('   Add GITHUB_PAT to .env for 5000 requests/hour\n');
            }
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
