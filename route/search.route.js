// search.route.js - Route handler for searching lessons
const express = require('express');
const Lesson = require('../models/lesson.model');

const router = express.Router();

router.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        const results = await Lesson.find({
            $or: [
                { topic: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } },
            ],
        });

        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
