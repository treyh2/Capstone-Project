const express = require('express');
const ordersRouter = express.Router();
const { createOrder, getOrders } = require('../db/orders');

ordersRouter.post('/', async (req, res, next) => {
  try {
    const { items, orderNumber, totalPrice } = req.body;

    if (!items || !orderNumber || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields in request body' });
    }
    const orderPromises = items.map(async (item) => {
      const { imageUrl, size, shoeId, name, price, quantity } = item;
      const order = await createOrder(req.user.id, imageUrl, size, shoeId, name, price, quantity);
      return order;
    });

    const createdOrders = await Promise.all(orderPromises);

    res.status(201).json(createdOrders);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

ordersRouter.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await getOrders(userId);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = ordersRouter;

