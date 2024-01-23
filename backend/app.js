// app.js - Main application file where you configure and set up your Express.js app
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middleware/logger.middleware');
const staticFileMiddleware = require('./middleware/staticFile.middleware');
const lessonRoutes = require('./route/lesson.route');
const orderRoutes = require('./route/order.route');
const updateSpacesRoute = require('./route/updateSpaces.route');
const searchRoute = require('./route/search.route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use('/lesson-images', staticFileMiddleware);

async function connectToDatabase() {
    const client = new MongoClient('mongodb://your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client.db('your-database-name');
}

// Example route using MongoDB Node.js Driver
app.get('/api/lessons', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const lessons = await db.collection('lessons').find().toArray();
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use('/', lessonRoutes);
app.use('/', orderRoutes);
app.use('/', updateSpacesRoute);
app.use('/', searchRoute);

module.exports = app;
