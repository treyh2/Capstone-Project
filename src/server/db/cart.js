//src/server/db/cart.js
const db = require("./client");

// Modify getAllCart function to accept userId parameter and filter cart items
async function getAllCart(userId) {
  try {
    const { rows } = await db.query("SELECT * FROM cart WHERE user_id = $1", [userId]);
    return rows;
  } catch (error) {
    throw error;
  }
}


async function addToCart(userId, shoeId, size, price, quantity) {
  try {
    // Insert the item into the cart table
    await db.query(
      `INSERT INTO cart (user_id, shoe_id, size, price, quantity)
      VALUES ($1, $2, $3, $4, $5)`,
      [userId, shoeId, size, price, quantity]
    );

    // Fetch the inserted item from the cart table
    const { rows } = await db.query(
      `SELECT * FROM cart WHERE user_id = $1 AND shoe_id = $2 AND size = $3`,
      [userId, shoeId, size]
    );

    return rows[0]; // Return the inserted item
  } catch (err) {
    throw err;
  }
}


async function updateCartItem(cartItemId, quantity) {
  try {
    const { rows } = await db.query(
      `UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *`,
      [quantity, cartItemId]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function getCartItems(userId) {
  try {
    const { rows } = await db.query(`
      SELECT cart.*, shoes.name, shoes."imageUrl", shoes.price * cart.quantity AS total_price, cart.size AS shoe_size
      FROM cart
      JOIN shoes ON cart.shoe_id = shoes.id
      WHERE cart.user_id = $1
    `, [userId]);
    return rows;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllCart,
  addToCart,
  updateCartItem,
  getCartItems
};
