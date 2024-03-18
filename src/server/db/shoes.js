// src/server/db/shoes.js

const db = require('./client');

async function getAllShoes() {
  try {
    const { rows } = await db.query(`SELECT * FROM shoes`);
    return rows;
  } catch (err) {
    console.error('Error fetching shoes:', error);
    throw err;
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

const createShoe = async ({ name, brand, size, imageUrl, price }) => {
  try {
    const { rows: [shoe ]} = await db.query(`
      INSERT INTO shoes (name, brand, size, imageUrl, price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`, [ name, brand, size, imageUrl, price ]);

      return shoe;
  } catch (err) {
    console.error('Error creating shoe:', err);
    throw err;
  }
}

module.exports = { 
  getAllShoes,
  getShoeByName,
  createShoe
};
