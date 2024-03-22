const db = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const getAllUsers = async () => {
  try {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const createUser = async ({
  firstname,
  lastname,
  email,
  password,
  address,
  city,
  state,
  zipcode,
}) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        INSERT INTO users(firstname, lastname, email, password, address, city, state, zipcode)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
      [firstname, lastname, email, hashedPassword, address, city, state, zipcode]
    );

    return user;
  } catch (err) {
    throw err;
  }
};

const getUser = async ({ email, password }) => {
  if (!email || !password) {
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECT * 
        FROM users
        WHERE email=$1;`,
      [email]
    );

    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const addToUserCart = async (userId, shoeId, size, quantity, price) => {
  try {
    const { rows: [user] } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    let updatedCart = [];

    if (user && user.userCart) {
      updatedCart = JSON.parse(user.userCart);
    }

    updatedCart.push({ shoeId, size, quantity, price });

    const totalPrice = updatedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    await db.query('UPDATE users SET userCart = $1, cartTotalPrice = $2 WHERE id = $3', [JSON.stringify(updatedCart), totalPrice, userId]);

  } catch (error) {
    throw error;
  }
};




module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getAllUsers,
  addToUserCart
};
