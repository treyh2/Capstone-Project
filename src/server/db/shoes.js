// src/server/db/shoes.js

const db = require('./client');

async function getAllShoes() {
  try {
    const { rows } = await db.query('SELECT * FROM shoes');
    return rows;
  } catch (error) {
    console.error('Error fetching shoes:', error);
    throw error;
  }
}

async function getShoeByName(name) {
  try {
    const { rows } = await db.query('SELECT * FROM shoes WHERE name = $1', [name]);
    return rows[0];
  } catch (error) {
    console.error(`Error fetching shoe by name ${name}:`, error);
    throw error;
  }
}

async function createShoe(shoeData) {
  try {
    const { name, brand, size, imageUrl, price } = shoeData;
    const query = `
      INSERT INTO shoes (name, brand, size, imageUrl, price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, brand, size, imageUrl, price];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error creating shoe:', error);
    throw error;
  }
}

module.exports = { 
  getAllShoes,
  getShoeByName,
  createShoe
};
