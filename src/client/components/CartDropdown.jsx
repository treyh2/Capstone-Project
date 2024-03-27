import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CartDropdown.css';

function CartDropdown({ cartVisible, setCartVisible }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

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

  const addToQuantity = async (shoeId, newQuantity) => {
    try {
      const response = await fetch(`/api/cart/quantity-add`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          shoeId: shoeId,
          quantity: newQuantity 
        })
      });
      
      if (response.ok) {
      } else {
        throw new Error('Failed to add quantity to item');
      }
    } catch (error) {
      console.error('Error adding quantity to item:', error);
    }
  };

  const subtractFromCart = async (itemId) => {
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={`cart-container ${cartVisible ? 'cart-visible' : ''}`}>
      <button className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
        Cart ({cartItems.length})
      </button>
      <div className="cart-content">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <p>{item.name}</p>
            <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '100px' }} />
            <p>${item.price}</p>
            <div className="quantity-controls">
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => addToQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
        ))}
        <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartDropdown;
