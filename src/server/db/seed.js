const db = require('./client');
const { createUser, addToUserCart } = require('./users');
const { createShoe, insertShoeSize } = require('./shoes');
const { addToCart } = require('./cart');
const { createOrder } = require('./orders');


const users = [
];

const shoes = [
  {
    id: '1',
    name: 'Jordan 11 Retro Low Concord Bred',
    brand: 'Air Jordan',
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: 'https://stockx.imgix.net/images/Air-Jordan-11-Retro-Low-Concord-Bred-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1606324216',
    price: '280'
  },
  {
    id: 2,
    name: "Jordan 5 Retro UNC University Blue",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://th.bing.com/th/id/OIP.PIoBq7D_xjzZF5K-ZMIHuwAAAA?rs=1&pid=ImgDetMain",
    price: "215.00"
  },
  {
    id: 3,
    name: "Drake NOCTA Air Force 1",
    brand: "Nike",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://cdn.shopify.com/s/files/1/0270/5326/0848/products/Nike-Air-Force-1-Low-Drake-Certified-Lover-Boy-Product.webp?v=1669981556",
    price: "210.00"
  },
  {
    id: 4,
    name: "Jordan 1 Retro Low Golf Travis Scott",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://stockx.imgix.net/images/Air-Jordan-1-Retro-Low-Travis-Scott-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1606317345",
    price: "950.00"
  },
  {
    id: 5,
    name: "Jordan 4 Retro Military Black",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://i.pinimg.com/originals/bf/f3/b4/bff3b4518efde82c67d3cc013d2bf75b.png",
    price: "420.00"
  },
  {
    id: 6,
    name: "Jordan 11 Retro Playoffs Bred",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://images.stockx.com/360/Air-Jordan-11-Retro-Playoffs-2019/Images/Air-Jordan-11-Retro-Playoffs-2019/Lv2/img01.jpg?fm=webp&amp;auto=compress&amp;w=576&amp;dpr=2&amp;updated_at=1635261996&amp",
    price: "300.00"
  },
  {
    id: 7,
    name: "adidas Yeezy Boost 350 V2 Bone",
    brand: "Yeezy",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://images.stockx.com/360/adidas-Yeezy-Boost-350-V2-Pure-Oat/Images/adidas-Yeezy-Boost-350-V2-Pure-Oat/Lv2/img01.jpg?fm=webp&amp;auto=compress&amp;w=576&amp;dpr=2&amp;updated_at=1703086092&amp",
    price: "220.00"
  },
  {
    id: 8,
    name: "Jordan 11 Retro Cool Grey",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://images.stockx.com/360/Air-Jordan-11-Retro-Cool-Grey-2021/Images/Air-Jordan-11-Retro-Cool-Grey-2021/Lv2/img01.jpg?fm=webp&amp;auto=compress&amp;w=576&amp;dpr=2&amp;updated_at=1635726052",
    price: "350.00"
  },
  {
    id: 9,
    name: "Jordan 1 Retro High OG UNC Toe",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://images.stockx.com/360/Air-Jordan-1-High-OG-UNC-Toe/Images/Air-Jordan-1-High-OG-UNC-Toe/Lv2/img01.jpg?fm=webp&amp;auto=compress&amp;w=576&amp;dpr=2&amp;updated_at=1688674754",
    price: "170.00"
  },
  {
    id: 10,
    name: "adidas Yeezy Boost 350 V2 Carbon Beluga",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://images.stockx.com/360/adidas-Yeezy-350-V2-Carbon-Beluga/Images/adidas-Yeezy-350-V2-Carbon-Beluga/Lv2/img01.jpg?fm=webp&amp;auto=compress&amp;w=576&amp;dpr=2&amp;updated_at=1686039353",
    price: "260.00"
  },
  {
    id: 11,
    name: "Air Force 1 Low Raygun",
    brand: "Nike",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://images.stockx.com/360/Nike-Air-Force-1-Low-Raygun/Images/Nike-Air-Force-1-Low-Raygun/Lv2/img01.jpg?fm=webp&amp;auto=compress&amp;w=576&amp;dpr=2&amp;updated_at=1669969044",
    price: "170.00"
  },
  {
    id: 12,
    name: "Air Force 1 Low Time Capsule Pack",
    brand: "Nike",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://images.stockx.com/360/Nike-Air-Force-1-Low-Time-Capsule-Pack/Images/Nike-Air-Force-1-Low-Time-Capsule-Pack/Lv2/img01.jpg?fm=webp&amp;auto=compress&amp;w=576&amp;dpr=2&amp;updated_at=1635259993",
    price: "125.00"
  },
  {
    id: 13,
    name: "Jordan 4 Retro SB Pine Green",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://images.stockx.com/360/Air-Jordan-4-Retro-SB-Pine-Green/Images/Air-Jordan-4-Retro-SB-Pine-Green/Lv2/img01.jpg?fm=webp&amp;auto=compress&amp;w=576&amp;dpr=2&amp;updated_at=1678350115",
    price: "360.00"
  }, 
  {
    id: 14,
    name: "Dunk Low Night Sky",
    brand: "Nike",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://images.stockx.com/360/Nike-Dunk-Low-Night-Sky/Images/Nike-Dunk-Low-Night-Sky/Lv2/img01.jpg?fm=webp&amp;auto=compress&amp;w=576&amp;dpr=2&amp;updated_at=1702394450",
    price: "110.00"
  },
  {
    id: 15,
    name: "Jordan 11 Retro Playoffs Bred",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://stockx.imgix.net/images/Air-Jordan-11-Retro-Playoffs-2019-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1606320266",
    price: "300.00"
  },
  {
    id: 16,
    name: "Jordan 4 Retro Red Cement",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://stockx.imgix.net/images/Air-Jordan-4-Retro-Fire-Red-2020-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1606762588",
    price: "240.00"
  },
  {
    id: 17,
    name: "Jordan 11 Retro DMP Gratitude",
    brand: "Air Jordan",
    sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5],
    imageUrl: "https://images.stockx.com/images/Air-Jordan-11-Retro-DMP-Defining-Moments-2023-PS.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1698943546",
    price: "180"
  },
];

const dropTables = async () => {
  try {
      await db.query(`
          DROP TABLE IF EXISTS shoe_sizes CASCADE;
      `);
      await db.query(`
          DROP TABLE IF EXISTS cart CASCADE; 
      `);
      await db.query(`
          DROP TABLE IF EXISTS users CASCADE; 
      `);
      await db.query(`
          DROP TABLE IF EXISTS shoes CASCADE; 
      `);
      await db.query(`
          DROP TABLE IF EXISTS orders CASCADE; 
      `);
  } catch(err) {
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
          cartTotalPrice DECIMAL (10, 2) DEFAULT 0  -- Removed the extra semicolon here
        )`);
        await db.query(`
        CREATE TABLE shoes(
          id SERIAL PRIMARY KEY,
          name TEXT,
          brand TEXT,
          "imageUrl" TEXT,
          price DECIMAL (10, 2)
        )`);
        await db.query(`
        CREATE TABLE shoe_sizes (
          id SERIAL PRIMARY KEY,
          shoe_id INTEGER REFERENCES shoes(id),
          size DECIMAL (3, 1)
        )`);
        await db.query(`
        CREATE TABLE cart (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          shoe_id INTEGER REFERENCES shoes(id),
          name TEXT,
          "imageUrl" TEXT,
          size DECIMAL (3, 1),
          price DECIMAL (10, 2),
          quantity INTEGER
        )`);
        await db.query(`
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          order_number INTEGER UNIQUE NOT NULL,
          user_id INTEGER REFERENCES users(id),
          shoe_id INTEGER REFERENCES shoes(id),
          "imageUrl" TEXT,
          size DECIMAL (3, 1),
          name TEXT,
          price DECIMAL (10, 2),
          quantity INTEGER
        )`);
    }
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      const insertedUser = await createUser({
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

      const userId = insertedUser.id;

      if (user.cartItems && user.cartItems.length > 0) {
        for (const item of user.cartItems) {
          const { shoeId, size } = item;
          await addToUserCart(userId, shoeId, size);
        }
        console.log('User cart seed data inserted successfully.');
      }
    }
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertShoes = async () => {
  try {
    for (const shoe of shoes) {

      const newShoe = await createShoe({
        id: shoe.id,
        name: shoe.name,
        brand: shoe.brand,
        imageUrl: shoe.imageUrl,
        price: shoe.price,
      });

      for (const size of shoe.sizes) {
        await insertShoeSize(newShoe.id, size);
      }
    }
    console.log('Seeded shoes successfully');
  } catch (error) {
    console.error('Error inserting seeded data', error);
  }
};

async function insertCart() {
  try {
    const cartItems = [];
    for (const item of cartItems) {
      await addToCart(item.user_id, item.shoeId, item.name, item.imageUrl, item.size, item.price, item.quantity);
    }
    console.log('Seeded cart successfully');
  } catch (error) {
    console.error('Error inserting seeded data', error);
  }
}

async function insertOrders() {
  try {
    const orderData = [];

    for (const order of orderData) {
      await createOrder(
        order.user_id,
        order.order_number,
        order.shoeId,
        order.name,
        order.size,
        order.imageUrl,
        order.price,
        order.quantity
      );
    }
    console.log('Seeded orders successfully');
  } catch (error) {
    console.error('Error inserting seeded orders', error);
  }
}


const seedDatabase = async () => {
  try {
      await db.connect();
      await dropTables();
      await createTables();
      await insertUsers();
      await insertShoes();
      await insertCart();
      await insertOrders();
  }
  
  catch (err) {
      console.error('Error seeding database:', err);
  }
  finally {
      db.end();
  }
}

seedDatabase();
