// db/orders.js

const db = require('./client');

async function createOrder(userId, shoeId, name, price, quantity) {
  try {
    // Generate a random order number
    const orderNumber = generateRandomOrderNumber();

    const { rows } = await db.query(
      `INSERT INTO orders (order_number, user_id, shoe_id, name, price, quantity) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *;`,
      [orderNumber, userId, shoeId, name, price, quantity]
    );

    return rows[0];
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

function generateRandomOrderNumber() {
  // Generate a random number between 100000 and 999999
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

module.exports = { createOrder };