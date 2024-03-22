const express = require('express');
const cartRouter = express.Router();
const { addToCart } = require('../db/cart');

cartRouter.post('/add', async (req, res, next) => {
  try {
    const { userId, shoe, quantity } = req.body;

    if (!shoe || !shoe.id) {
      throw new Error('Invalid shoe data in request');
    }

    const { id: shoeId, name, imageUrl, price, size } = shoe;

    await addToCart(userId, shoeId, name, imageUrl, size, price, quantity);

    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = cartRouter;
