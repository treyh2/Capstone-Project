// src/server/db/users.js

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

const addToUserCart = async (userId, shoeId, size) => {
  try {
    // Check if the user already has a cart
    const { rows: [existingCart] } = await db.query(
      `SELECT * FROM users WHERE id = $1`,
      [userId]
    );

    // If the user doesn't have a cart yet, create one
    if (!existingCart.userCart) {
      await db.query(
        `UPDATE users SET userCart = $1 WHERE id = $2`,
        [[{ shoeId, size }], userId]
      );
    } else {
      // If the user already has a cart, append the new item to the existing cart
      const updatedCart = [...existingCart.userCart, { shoeId, size }];
      await db.query(
        `UPDATE users SET userCart = $1 WHERE id = $2`,
        [updatedCart, userId]
      );
    }
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
