// lesson.model.js - MongoDB Node.js Driver model for lessons
const { MongoClient, ObjectId } = require('mongodb');

async function connectToDatabase() {
    const client = new MongoClient('mongodb://your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client.db('your-database-name');
}

async function getLessonById(lessonId) {
    const db = await connectToDatabase();
    return db.collection('lessons').findOne({ _id: new ObjectId(lessonId) });
}

module.exports = { getLessonById };
