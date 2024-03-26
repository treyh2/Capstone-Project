import React, { useState, useEffect } from "react";
import axios from 'axios';
import { NavLink, Link, useLocation } from 'react-router-dom';
import '../styles/Catalog.css';

function Catalog() {
  const [shoes, setShoes] = useState([]);
  const [sortedShoes, setSortedShoes] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation

  useEffect(() => {
    async function fetchShoes() {
      try {
        const { data } = await axios.get('/api/shoes');
        if (Array.isArray(data)) {
          setShoes(data);
          setSortedShoes(data); // Initially, set sortedShoes to be the same as shoes
        } else {
          console.error('Invalid data format for shoes:', data);
          setShoes([]);
          setSortedShoes([]);
        }
      } catch (error) {
        console.error('Error fetching shoes:', error);
        setShoes([]);
        setSortedShoes([]);
      }
    }
  
    fetchShoes();
  }, []);

  useEffect(() => {
    // Sort shoes based on the selected sort order
    if (sortOrder === 'default') {
      setSortedShoes(shoes); // If default, set shoes as they are
    } else if (sortOrder === 'highestToLowest') {
      const sorted = [...shoes].sort((a, b) => b.price - a.price);
      setSortedShoes(sorted);
    } else if (sortOrder === 'lowestToHighest') {
      const sorted = [...shoes].sort((a, b) => a.price - b.price);
      setSortedShoes(sorted);
    }
  }, [shoes, sortOrder]);

  const handleSort = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter shoes based on search term
  const filteredShoes = sortedShoes.filter(shoe => 
    shoe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
        <div className="search-bar">
          <input 
            type="text"
            placeholder="Search shoes..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="sort-dropdown">
          <p className="sort-label">Sort by:</p>
          <select value={sortOrder} onChange={handleSort}>
            <option value="default">Default</option>
            <option value="highestToLowest">Highest Price to Lowest</option>
            <option value="lowestToHighest">Lowest Price to Highest</option>
          </select>
        </div>
        <div className="shoes-grid">
          {filteredShoes.map(shoe => (
            <div key={shoe.id} className="shoe-card">
              <Link to={`/shoe/${encodeURIComponent(shoe.name)}`} className="shoe-link">
                <img src={shoe.imageUrl} alt={shoe.name} className='shoe-img'/>
                <div className="shoe-info">
                  <h2 className="shoe-name">{shoe.name}</h2>
                  <p className="shoe-price">${shoe.price}</p>
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
