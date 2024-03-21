import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function ShoeDetails() {
  const { name } = useParams();
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');

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

    const addToCart = async (selectedSize) => {
  if (!selectedSize) {
    setError('Please select a size');
    return;
  }

  try {
    // Log the URL before making the request
    const url = '/api/cart/add';
    console.log('Request URL:', url);

    const response = await axios.post(url, {
      shoeId: shoe.id,
      size: selectedSize,
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error adding to cart:', error);
    setError('Failed to add item to cart'); // Update error state
  }
};

  
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
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/catalog'>Catalog</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </div>
      </header>
      <div className="single-shoe-container">
        <h1>{shoe.name}</h1>
        <img src={shoe.imageUrl} alt={shoe.name} />
        <p>Brand: {shoe.brand}</p>
        <p>Price: ${shoe.price}</p>
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value=''>Select Size</option>
          {shoe.sizes && shoe.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <button onClick= {() => addToCart(selectedSize)}>Add to Cart</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default ShoeDetails;
