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

module.exports = { 
  getAllShoes,
   getShoeByName
 };
