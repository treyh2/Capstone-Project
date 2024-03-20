const db = require('./client');
const { createUser } = require('./users');
const { createShoe } = require('./shoes');

const users = [
  {
    firstname: 'Emily',
    lastname: 'Johnson',
    email: 'emily@example.com',
    password: 'securepass',
    address: '123 Home',
    city: 'Detroit',
    state: 'Michigan',
    zipcode: '12345',
  }
  // Add more user objects as needed
];  
const shoes = [
  {
    id: '1',
    name: 'Jordan 11 Retro Low Concord Bred',
    brand: 'Air Jordan',
    size: '10.5',
    imageUrl: 'https://stockx.imgix.net/images/Air-Jordan-11-Retro-Low-Concord-Bred-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1606324216',
    price: '280'
  },
  {
    "id": 2,
    "name": "Jordan 5 Retro UNC University Blue",
    "brand": "Air Jordan",
    "size": "11.0",
    "imageUrl": "https://th.bing.com/th/id/OIP.PIoBq7D_xjzZF5K-ZMIHuwAAAA?rs=1&pid=ImgDetMain",
    "price": "215.00"
},
{
    "id": 3,
    "name": "Drake NOCTA Air Force 1",
    "brand": "Nike",
    "size": "10.0",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0270/5326/0848/products/Nike-Air-Force-1-Low-Drake-Certified-Lover-Boy-Product.webp?v=1669981556",
    "price": "210.00"
},
{
    "id": 4,
    "name": "Jordan 1 Retro Low Golf Travis Scott",
    "brand": "Air Jordan",
    "size": "10.0",
    "imageUrl": "https://stockx.imgix.net/images/Air-Jordan-1-Retro-Low-Travis-Scott-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1606317345",
    "price": "950.00"
},
{
  "id": 5,
  "name": "Jordan 4 Retro Military Black",
  "brand": "Air Jordan",
  "size": "11.5",
  "imageUrl": "https://i.pinimg.com/originals/bf/f3/b4/bff3b4518efde82c67d3cc013d2bf75b.png",
  "price": "420.00"
},
{
  "id": 6,
  "name": "Jordan 11 Retro Playoffs Bred",
  "brand": "Air Jordan",
  "size": "11",
  "imageUrl": "https://stockx.imgix.net/images/Air-Jordan-11-Retro-Playoffs-2019-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1606320266",
  "price": "300.00"
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
          firstName VARCHAR(50) DEFAULT 'firstname',
          lastName VARCHAR(50) DEFAULT 'lastname',
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          address TEXT NOT NULL,
          city VARCHAR(255) NOT NULL,
          state VARCHAR(50) NOT NULL,
          zipcode VARCHAR(5) NOT NULL,
          userCart TEXT,
          pastOrders TEXT
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
      await createUser({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        address: user.address,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
      });
      console.log('User seed data inserted successfully.');
    }
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
