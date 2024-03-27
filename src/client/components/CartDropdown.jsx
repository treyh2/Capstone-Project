import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/CartDropdown.css'; // Import CSS for CartDropdown styling

function CartDropdown({ cartItems, cartVisible, setCartVisible, addToCart }) {
  const navigate = useNavigate(); // Initialize navigate

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const handleCheckout = () => {
    // Redirect to checkout page
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
            <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '100px' }}/>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>

          </div>
        ))}
        <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p> {/* Display total price */}
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}
 
export default CartDropdown;
