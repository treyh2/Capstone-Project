// Home.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; 
import '../styles/Home.css'; // Import CSS file for styling

function Home() {
  return (
    <>
    <header>
        <nav>
          <div className='NavBar'>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/catalog'>Catalog</NavLink>
            <NavLink to='/login'>Login</NavLink>
          </div>
        </nav>
      </header>
    <div className="home-container">
      <img src="/kicks.jpeg" alt="kicks" className="home-image" />
      <div className="home-content">
        <h1>Welcome to Our Sneaker Store!</h1>
        <p>Explore our latest collection of sneakers.</p>
      </div>
    </div>
    </>
  );
}

export default Home;
