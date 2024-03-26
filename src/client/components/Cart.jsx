import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        // Fetch JWT token from local storage or wherever it's stored
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    fetchCartItems();
  }, []);

  const handleCheckout = async () => {
    console.log('Checkout logic goes here');
    // Add logic for handling checkout (if needed)
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div>
              <img src={item.imageUrl} alt={item.name} style={{ width: '50px' }} />
              <div>{item.name}</div>
              <div>Size: {item.size}</div>
              <div>Price: {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : 'Price not available'}</div>
              <div>Quantity: {item.quantity}</div>
              <div>Total Price: {typeof item.total_price === 'number' ? `$${item.total_price.toFixed(2)}` : 'Total price not available'}</div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
