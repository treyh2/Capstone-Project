import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CartDropdown.css';

function CartDropdown({ cartItems, cartVisible, setCartVisible, addToQuantity, subtractFromCart }) {
  const navigate = useNavigate();
  

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
              <button onClick={() => subtractFromCart(item.id)}>-</button>
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
