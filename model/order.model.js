// order.model.js - Mongoose model for orders
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    lessonIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    quantity: Number,
    customerName: String,
    customerEmail: String,
});

module.exports = mongoose.model('Order', orderSchema);
