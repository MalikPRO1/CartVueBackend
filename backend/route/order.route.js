// order.route.js - Route handler for orders
const express = require('express');
const Order = require('../model/order.model');

const router = express.Router();

router.post('/orders', async (req, res) => {
    try {
        const { lessonIds, quantity, customerName, customerEmail } = req.body;

        const order = new Order({ lessonIds, quantity, customerName, customerEmail });
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
