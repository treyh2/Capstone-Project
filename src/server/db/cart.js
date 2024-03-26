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

async function getCartItems(cartId) {
  try {
    const { rows } = await db.query(`
      SELECT * FROM cart
      WHERE user_id = $1
    `, [cartId]);
    return rows;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
}



module.exports = { addToCart, insertCart, getCartItems };
