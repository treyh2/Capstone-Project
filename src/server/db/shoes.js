const db = require('./client');

async function getAllShoes() { // use to fetch all the shoes from the database 
  try {
    const shoesQuery = 'SELECT * FROM shoes';
    const sizesQuery = 'SELECT size FROM shoe_sizes WHERE shoe_id = $1';

    const { rows: shoes } = await db.query(shoesQuery);
    const shoesWithSizes = [];

    for (const shoe of shoes) {
      const { rows: sizes } = await db.query(sizesQuery, [shoe.id]);
      shoe.sizes = sizes.map(row => row.size);
      shoesWithSizes.push(shoe);
    }

    return shoesWithSizes;
  } catch (error) {
    console.error('Error fetching shoes:', error);
    throw error;
  }
}


async function getShoeByName(name) {
  try {
    const shoeQuery = 'SELECT * FROM shoes WHERE name = $1';
    const sizeQuery = 'SELECT size FROM shoe_sizes WHERE shoe_id = $1';

    const { rows: shoeRows } = await db.query(shoeQuery, [name]);
    const { rows: sizeRows } = await db.query(sizeQuery, [shoeRows[0].id]);

    const shoe = shoeRows[0];
    shoe.sizes = sizeRows.map(row => row.size);

    return shoe;
  } catch (error) {
    console.error(`Error fetching shoe by name ${name}:`, error);
    throw error;
  }
}

async function createShoe(shoe) { //adding shoe to shoes table with values
  try {
    const { rows } = await db.query(
      `INSERT INTO shoes (name, brand, "imageUrl", price) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *;`,
      [shoe.name, shoe.brand, shoe.imageUrl, shoe.price]
    );

    return rows[0];
  } catch (error) {
    console.error('Error creating shoe:', error);
    throw error;
  }
}

async function getShoeById(shoeId) { // getting shoe value when nav to shoedetails
  try {
    const { rows } = await db.query('SELECT * FROM shoes WHERE id = $1', [shoeId]); 
    if (rows.length === 0) {
      throw new Error('Shoe not found');
    }
    return rows[0];
  } catch (error) {
    console.error(`Error fetching shoe by ID ${shoeId}:`, error);
    throw error;
  }
}

async function insertShoeSize(shoeId, size) { //when selecting shoe size, adds to cart and insert shoe size into shoe
  try {
    await db.query('INSERT INTO shoe_sizes (shoe_id, size) VALUES ($1, $2)', [shoeId, size]);
  } catch (error) {
    console.error(`Error inserting shoe size for shoe ${shoeId}:`, error);
    throw error;
  }
}

module.exports = { 
  getAllShoes,
  getShoeByName,
  createShoe,
  getShoeById,
  insertShoeSize
};
