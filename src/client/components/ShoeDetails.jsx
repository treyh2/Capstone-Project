// ShoeDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';

function ShoeDetails() {
  const { name } = useParams();
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShoeDetails() {
      try {
        const response = await axios.get(`/api/shoes/${name}`);
        setShoe(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shoe details:', error);
      }
    }

    fetchShoeDetails();
  }, [name]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!shoe) {
    return <p>Shoe not found.</p>;
  }

  return (
    <div className='single-shoe-header'>
      <header className='header'>
        <div className='navbar'>
          <NavLink to ='/'>Home</NavLink>
          <NavLink to ='/catalog'>Catalog</NavLink>
          <NavLink to ='/login'>Login</NavLink>
        </div>
      </header>
    <div className="single-shoe-container">
      <h1>{shoe.name}</h1>
      <img src={shoe.imageUrl} alt={shoe.name} />
      <p>Brand: {shoe.brand}</p>
      <p>Size: {shoe.size}</p>
      <p>Price: ${shoe.price}</p>
    </div>
    </div>
  );
}

export default ShoeDetails;
