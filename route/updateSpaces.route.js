// updateSpaces.route.js - Route handler for updating lesson spaces
const express = require('express');
const Lesson = require('../models/lesson.model');

const router = express.Router();

router.put('/lessons/:id/update-spaces', async (req, res) => {
    try {
        const lessonId = req.params.id;
        const { spacesToUpdate } = req.body;

        await Lesson.findByIdAndUpdate(
            lessonId,
            { $inc: { space: -spacesToUpdate } },
            { new: true }
        );

        res.json({ message: 'Spaces updated successfully' });
    } catch (error) {
        console.error('Error updating lesson space:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
