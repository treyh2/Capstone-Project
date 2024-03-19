const db = require('./client');
const { createUser } = require('./users');
const { createShoe } = require('./shoes');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];  
const shoes = [
  {
    id: '1',
    name: 'Travis Scott x Air Jordan 1 Low Mocha',
    brand: 'Jordan',
    size: '10.5',
    imageUrl: 'https://www.aj1classic.ru/65001-large_default/travis-scott-x-air-jordan-1-low-mocha-cq4277-001-brown.jpg',
    price: '1640'
  }
];
const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS users;
        `)
        await db.query(`
        DROP TABLE IF EXISTS shoes;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name', 
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )`)
        await db.query(`
        CREATE TABLE shoes(
          id SERIAL PRIMARY KEY,
          name TEXT,
          brand TEXT,
          size DECIMAL (3, 1),
          "imageUrl" TEXT,
          price DECIMAL (10, 2)
        )
        
        `)
    }
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertShoes = async () => {
  try {
    for (const shoe of shoes) {
      await createShoe({id: shoe.id, name: shoe.name, brand: shoe.brand, size: shoe.size, imageUrl: shoe.imageUrl, price: shoe.price})
    }
    console.log('Seeded shoes successfully');
  } catch (error) {
    console.error('Error inserting seeded data', error)
  }
}

const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
        await insertShoes();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
