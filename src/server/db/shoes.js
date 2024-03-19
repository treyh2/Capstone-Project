// src/server/db/shoes.js

const db = require('./client');

async function getAllShoes() {
  try {
    const { rows } = await db.query(`SELECT * FROM shoes`);
    return rows;
  } catch (err) {
    console.error('Error fetching shoes:', err);
    throw err;
  }
}

async function getShoeByName(name) {
  try {
    const { rows } = await db.query('SELECT * FROM shoes WHERE name = $1', [name]);
    return rows[0];
  } catch (err) {
    console.error(`Error fetching shoe by name ${name}:`, err);
    throw err;
  }
}
 
async function createShoe(shoe) {
    const { rows } = await db.query(`
      INSERT INTO shoes 
      (id, name, brand, size, "imageUrl", price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`, [ shoe.id, shoe.name, shoe.brand, shoe.size, shoe.imageUrl, shoe.price ]);

      return rows[0];
}

module.exports = { 
  getAllShoes,
  getShoeByName,
  createShoe
};
