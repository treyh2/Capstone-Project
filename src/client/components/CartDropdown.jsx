import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/CartDropdown.css';

function CartDropdown({ cartVisible, setCartVisible }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items on component mount
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
          shoeId: shoeId, // Pass the correct shoeId to the backend
          quantity: newQuantity // Use the newQuantity parameter
        })
      });
      
      if (response.ok) {
        // Update the cart items state or trigger a fetch for updated cart items
        console.log(`Added ${newQuantity} to item ${shoeId}`);
      } else {
        throw new Error('Failed to add quantity to item');
      }
    } catch (error) {
      console.error('Error adding quantity to item:', error);
    }
  };
  
  // Function to subtract an item from the cart
  const subtractFromCart = async (itemId) => {
    // Implement subtractFromCart function if needed
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
              {/* Implement subtract button */}
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
