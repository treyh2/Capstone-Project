const db = require('./client');
const { getShoeById } = require('./shoes');
const { addToUserCart } = require('./users')

async function addToCart(userId, shoeId, name, imageUrl, size, price, quantity) { // adding item to cart 
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

async function insertCart() { //adds shoe and shoe values into current user cart
  try {
    const allUsers = await addToUserCart();

    for (const user of allUsers) {
      for (const item of user.cartItems) {
        const { shoeId, size } = item;

        const shoe = await getShoeById(shoeId);

        await addToCart(user.id, shoeId, shoe.name, shoe.imageUrl, size, shoe.price, 1);
      }
    }
    
  } catch (error) {
    console.error('Error inserting seeded data', error);
  }
}
async function addToQuantity(userId, shoeId, quantity) { // broken
  try {
    if (!shoeId) {
      throw new Error('Invalid shoeId');
    }

    const existingItem = await db.query(
      `SELECT * FROM cart WHERE user_id = $1 AND shoe_id = $2`,
      [userId, shoeId]
    );

    if (existingItem.rows.length > 0) {
      await db.query(
        `UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND shoe_id = $3 RETURNING *`,
        [quantity, userId, shoeId]
      );
      return { message: 'Quantity added successfully' };
    } else {
      console.error(`Item with shoe_id ${shoeId} does not exist in the cart for user ${userId}`);
      throw new Error('Item does not exist in the cart');
    }
  } catch (error) {
    console.error('Error adding quantity to item:', error);
    throw error;
  }
}


async function subtractFromCart(userId, itemId) { // broken
  try {
    await db.query(
      `DELETE FROM cart WHERE user_id = $1 AND id = $2`,
      [userId, itemId]
    );
  } catch (error) {
    console.error('Error subtracting item from cart:', error);
    throw error;
  }
}
async function getCartItems(userId) { //gets the items from the current user cart
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

async function clearCart(userId) { // clears cart after user checksout
  try {
    await db.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}

module.exports = { addToCart, insertCart, getCartItems, clearCart, subtractFromCart, addToQuantity };
