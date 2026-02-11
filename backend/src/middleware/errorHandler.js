/**
 * Error Handler Middleware
 * Global error handling for the application
 */

/**
 * Not Found Handler - 404 errors
 */
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
};

/**
 * Global Error Handler
 * Handles all errors thrown in the application
 */
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
