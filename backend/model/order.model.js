// order.model.js - MongoDB Node.js Driver model for orders
const { MongoClient, ObjectId } = require('mongodb');

async function connectToDatabase() {
    const client = new MongoClient('mongodb://your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client.db('your-database-name');
}

async function getOrderById(orderId) {
    const db = await connectToDatabase();
    return db.collection('orders').findOne({ _id: new ObjectId(orderId) });
}

module.exports = { getOrderById };
