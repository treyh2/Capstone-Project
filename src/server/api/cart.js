// src/server/api/cart.js
const express = require('express');
const cartRouter = express.Router();
const { getCartItems, addToCart } = require('../db/cart');
const { getShoeById } = require('../db/shoes'); // Import the function to fetch shoe details by ID

// Endpoint to get all cart items
cartRouter.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartItems = await getCartItems(userId); // Pass userId to getCartItems function
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to add item to user's cart
cartRouter.post('/add', async (req, res, next) => {
  try {
    const { shoeId, size, price, quantity } = req.body;
    const userId = req.user.id;

    // Add item to user's cart
    await addToCart(userId, shoeId, size, price, quantity);

    // Fetch the details of the shoe that was added to the cart
    const shoe = await getShoeById(shoeId);

    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = cartRouter;
