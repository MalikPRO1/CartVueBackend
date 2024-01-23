// lesson.route.js - Route handler for lessons
const express = require('express');
const Lesson = require('../model/lesson.model');

const router = express.Router();

router.get('/lessons', async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
