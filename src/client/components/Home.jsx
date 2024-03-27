import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import CartDropdown from './CartDropdown'; 
import '../styles/Home.css';

function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false); 
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="navbar">
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/catalog'>Catalog</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </div>
      </header>
      <CartDropdown cartItems={cartItems} cartVisible={cartVisible} setCartVisible={setCartVisible} />
      <div className="home-box">
        <img src="/kicks.jpeg" alt="kicks" className="home-image" />
        <div className="home-content">
          <h1>Welcome to Kicks</h1>
          <p>Explore our latest collection of sneakers.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
