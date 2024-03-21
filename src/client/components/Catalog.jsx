import React, { useState, useEffect } from "react";
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import '../styles/Catalog.css';

function Catalog() {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    async function fetchShoes() {
      try {
        const { data } = await axios.get('/api/shoes');
        if (Array.isArray(data)) {
          setShoes(data);
        } else {
          console.error('Invalid data format for shoes:', data);
          setShoes([]);
        }
      } catch (error) {
        console.error('Error fetching shoes:', error);
        setShoes([]);
      }
    }
  
    fetchShoes();
  }, []);
  
  return (
    <div className="catalog-container">
      <header className="header">
        <div className="navbar">
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/catalog'>Catalog</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </div>
      </header>
      <div className="shoes-container">
        <h1 className="title">Explore Our Collection</h1>
        <div className="shoes-grid">
          {shoes.map(shoe => (
            <div key={shoe.id} className="shoe-card">
              <Link to={`/shoe/${encodeURIComponent(shoe.name)}`} className="shoe-link">
                <img src={shoe.imageUrl} alt={shoe.name} className='shoe-img'/>
                <div className="shoe-info">
                  <h2 className="shoe-name">{shoe.name}</h2>
                  <p className="shoe-price">Price: ${shoe.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
