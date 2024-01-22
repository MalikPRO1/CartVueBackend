// lesson.model.js - Mongoose model for lessons
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    topic: String,
    location: String,
    price: Number,
    space: Number,
});

module.exports = mongoose.model('Lesson', lessonSchema);
