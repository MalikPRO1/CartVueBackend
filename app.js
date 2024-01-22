// app.js - Main application file where you configure and set up your Express.js app
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middlewares/logger.middleware');
const staticFileMiddleware = require('./middlewares/staticFile.middleware');
const lessonRoutes = require('./routes/lesson.route');
const orderRoutes = require('./routes/order.route');
const updateSpacesRoute = require('./routes/updateSpaces.route');
const searchRoute = require('./routes/search.route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use('/lesson-images', staticFileMiddleware);

mongoose.connect('mongodb://your-mongodb-uri', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/', lessonRoutes);
app.use('/', orderRoutes);
app.use('/', updateSpacesRoute);
app.use('/', searchRoute);

module.exports = app;
