const express = require('express');
const cartRouter = express.Router();
const { addToCart, getCartItems, clearCart, subtractFromCart, addToQuantity } = require('../db/cart');

cartRouter.post('/add', async (req, res, next) => {
  try {
    const { shoe, quantity } = req.body;

    if (!shoe || !shoe.id) {
      throw new Error('Invalid shoe data in request');
    }

    const {id , name, imageUrl, price, size } = shoe;

    await addToCart(req.user.id, id, name, imageUrl, size, price, quantity);

    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

cartRouter.post('/quantity-add', async (req, res, next) => {
  try {
    const { shoeId, quantity } = req.body;
    await addToQuantity(req.user.id, shoeId, quantity);
    res.status(201).json({ message: 'Quantity added successfully' });
  } catch (error) {
    console.error('Error adding quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

cartRouter.post('/subtract', async (req, res, next) => {
  try {
    const { itemId } = req.body;
    await subtractFromCart(req.user.id, itemId);
    res.status(200).json({ message: 'Item subtracted successfully' });
  } catch (error) {
    console.error('Error subtracting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

cartRouter.get('/', async (req, res, next) => {
  const userId = req.user.id;
  try {
    const cartItems = await getCartItems(userId);
    console.log('cart items:', cartItems)
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    next(error);
  }
});

cartRouter.post('/clear', async (req, res, next) => {
  const userId = req.user.id; // Assuming user information is available in the request
  try {
    await clearCart(userId);
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = cartRouter;
