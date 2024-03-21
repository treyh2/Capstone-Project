// src/server/db/cart.js

const db = require('./client');

const addToCart = async (shoeId, size) => {
  try {
    await db.query(
      `INSERT INTO users_carts (shoe_id, size) VALUES ($1, $2)`,
      [shoeId, size]
    );
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

module.exports = {
  addToCart
};

