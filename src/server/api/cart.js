//src/server/api/cart.js
const express = require('express');
const cartRouter = express.Router();
const { addToCart } = require('../db/cart');
const { getShoeById } = require('../db/shoes');

cartRouter.post('/add', async (req, res, next) => {
  try {
    const { shoeId, size } = req.body;

    const shoe = await getShoeById(shoeId);

    if (shoe) {
      await addToCart(shoeId, size);
      res.status(200).json({ success: true, message: 'Item added to cart successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Shoe not found' });
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ success: false, message: 'Failed to add item to cart' });
  }
});

module.exports = cartRouter;
