// staticFile.middleware.js - Middleware to serve static files (lesson images)
const express = require('express');
const path = require('path');

const staticPath = path.join(__dirname, 'lesson-images');
const staticFileMiddleware = express.static(staticPath);

module.exports = staticFileMiddleware;
