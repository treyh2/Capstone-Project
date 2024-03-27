const express = require('express');
const ordersRouter = express.Router();
const { createOrder, getOrders } = require('../db/orders');

// Endpoint to create a new order
ordersRouter.post('/', async (req, res, next) => {
  try {
    const { items, orderNumber, totalPrice } = req.body;

    // Ensure that the required data is provided in the request body
    if (!items || !orderNumber || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields in request body' });
    }

    // Create each item in the order in the database
    const orderPromises = items.map(async (item) => {
      const { imageUrl, size, shoeId, name, price, quantity } = item;
      const order = await createOrder(req.user.id, imageUrl, size, shoeId, name, price, quantity);
      return order;
    });

    // Wait for all orders to be created
    const createdOrders = await Promise.all(orderPromises);

    // Respond with the created orders
    res.status(201).json(createdOrders);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch orders
ordersRouter.get('/', async (req, res, next) => {
  try {
    // Fetch orders for the authenticated user
    const userId = req.user.id; // Assuming user information is available in the request
    const orders = await getOrders(userId);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = ordersRouter;

