import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShoeDetails({ token }) {
  const { name } = useParams();
  const navigate = useNavigate();
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

  const addToCart = async () => {
    if (!shoe) {
      console.error('Shoe object is undefined');
      return;
    }
    console.log('Shoe Object:', shoe)
    if (!token) {
      setError('Please log in to add items to your cart');
      return;
    }
  
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
  
    try {
      const shoeToAdd = {
        id: shoe.id,
        name: shoe.name,
        imageUrl: shoe.imageUrl,
        price: shoe.price,
        size: selectedSize,
      };
  
      const addToCartResponse = await axios.post('/api/cart/add', {
        shoe: shoeToAdd,
        quantity: 1,
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log('Response:', addToCartResponse.data);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart');
    }
  };
  
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
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
        <p>{shoe.name}</p>
        <p>{shoe.brand}</p>
        <p>${shoe.price}</p>
        <select value={selectedSize} onChange={handleSizeChange}>
          <option value=''>Select Size</option>
          {shoe.sizes && shoe.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <button onClick={addToCart}>Add to Cart</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default ShoeDetails;
