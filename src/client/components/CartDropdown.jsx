import React from 'react';
import '../styles/CartDropdown.css'; // Import CSS for CartDropdown styling

function CartDropdown({ cartItems, cartVisible, setCartVisible, addToCart }) {

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
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
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
        <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p> {/* Display total price */}
        <button className="checkout-button" onClick={() => console.log("Redirect to checkout")}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartDropdown;
