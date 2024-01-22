// logger.middleware.js - Middleware that outputs all requests to the server console
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

module.exports = loggerMiddleware;
