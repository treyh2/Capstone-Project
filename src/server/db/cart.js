const db = require('./client');
const { getShoeById } = require('./shoes');
const { addToUserCart } = require('./users')

async function addToCart(userId, shoeId, name, imageUrl, size, price, quantity) {
  try {
    const { rows } = await db.query(
      `INSERT INTO cart (user_id, shoe_id, name, "imageUrl", size, price, quantity) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *;`,
      [userId, shoeId, name, imageUrl, size, price, quantity]
    );
 
    return rows[0];
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}

async function insertCart() {
  try {
    const allUsers = await addToUserCart();

    for (const user of allUsers) {
      for (const item of user.cartItems) {
        const { shoeId, size } = item;

        const shoe = await getShoeById(shoeId);

        await addToCart(user.id, shoeId, shoe.name, shoe.imageUrl, size, shoe.price, 1);
      }
    }
    
    console.log('Seeded cart successfully');
  } catch (error) {
    console.error('Error inserting seeded data', error);
  }
}

async function addToQuantity(userId, shoeId, quantity) {
  try {
    // Check if the item already exists in the cart
    const existingItem = await db.query(
      `SELECT * FROM cart WHERE user_id = $1 AND shoe_id = $2`,
      [userId, shoeId]
    );

    if (existingItem.rows.length > 0) {
      // If the item exists, update the quantity
      await db.query(
        `UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND shoe_id = $3`,
        [quantity, userId, shoeId]
      );
    } else {
      // If the item does not exist, insert it into the cart
      await db.query(
        `INSERT INTO cart (user_id, shoe_id, quantity) VALUES ($1, $2, $3)`,
        [userId, shoeId, quantity]
      );
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}

async function subtractFromCart(userId, itemId) {
  try {
    // Remove the specified item from the cart
    await db.query(
      `DELETE FROM cart WHERE user_id = $1 AND id = $2`,
      [userId, itemId]
    );
  } catch (error) {
    console.error('Error subtracting item from cart:', error);
    throw error;
  }
}


async function getCartItems(userId) {
  try {
    const { rows } = await db.query(`
      SELECT * FROM cart
      WHERE user_id = $1
    `, [userId]);
    return rows;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
}

async function clearCart(userId) {
  try {
    await db.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);
    console.log('Cart cleared successfully');
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}

module.exports = { addToCart, insertCart, getCartItems, clearCart, subtractFromCart, addToQuantity };
