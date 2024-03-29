const db = require('./client');

async function createOrder(userId, imageUrl, size, shoeId, name, price, quantity) { // create a new order for the user
  try {
    const orderNumber = generateRandomOrderNumber();

    const { rows } = await db.query(
      `INSERT INTO orders (order_number, user_id, "imageUrl", size, shoe_id, name, price, quantity) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *;`,
      [orderNumber, userId, imageUrl, size, shoeId, name, price, quantity]
    );

    return rows[0];
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

function generateRandomOrderNumber() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

async function getOrders(userId) { // getOrders for the order history
  try {
    const { rows } = await db.query(`
      SELECT * FROM orders
      WHERE user_id = $1
    `, [userId]);
    return rows;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

module.exports = { createOrder, getOrders };