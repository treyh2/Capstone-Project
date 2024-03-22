import React from 'react';
import { NavLink } from 'react-router-dom'; 
import '../styles/Home.css'; 

function Home() {
  return (
    <div className = 'home-container'>
    <header className='header'>
          <div className='navbar'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/catalog'>Catalog</NavLink>
            <NavLink to='/login'>Login</NavLink>
          </div>
      </header>
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
