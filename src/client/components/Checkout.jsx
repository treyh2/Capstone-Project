import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import "../styles/Checkout.css"

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch cart items
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems(); // Fetch cart items when the component mounts
  }, []);

  useEffect(() => {
    // Function to fetch order history
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    if (checkoutComplete) {
      fetchOrderHistory(); // Fetch order history when checkout is complete
    }
  }, [checkoutComplete]);

  // Define a function to generate a random order number
  const generateRandomOrderNumber = () => {
    // Generate a random number between 100000 and 999999
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');

      // Calculate total price from cartItems
      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

      // Generate a random order number
      const orderNumber = generateRandomOrderNumber();

      // Prepare order data to send to the server
      const orderData = {
        orderNumber: orderNumber,
        totalPrice: totalPrice,
        items: cartItems.map(item => ({
          shoeId: item.id,
          name: item.name,
          price: item.price,
          size: item.size, // Include shoe size
          imageUrl: item.imageUrl, // Include image URL
          quantity: item.quantity
        }))
      };

      // Send POST request to create the order
      const response = await axios.post('/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await axios.post('/api/cart/clear', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Order placed successfully:', response.data);
      // Optionally, you can navigate to a confirmation page or perform any other action upon successful order placement
      setCheckoutComplete(true);
    } catch (error) {
      console.error('Error placing order:', error);
      console.log('Response data:', error.response.data);
    }
  };

  return (
    <div>
      <div className="checkout-container">
      <header className="header">
        <div className="navbar">
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/catalog'>Catalog</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </div>
      </header>
      <h2 className='checkout-header'>Checkout</h2>
      {checkoutComplete ? (
        <div className='order-history'>
          <p>Order successfully placed!</p>
          <h3>Order History</h3>
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                Order Number: {order.order_number}
                <br />
                {order.name} - ${order.price} - Size: {order.size} 
                <br />
                <img src={order.imageUrl} alt={order.name} style={{ maxWidth: '100px' }} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='cart-items'>
          {/* Display cart items */}
          {cartItems.map(item => (
            <div key={item.id}>
              <p>{item.name} - ${item.price} - Size: {item.size} - Quantity: {item.quantity}
              <br />
              <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '100px' }} />
              </p>
            </div>
          ))}
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Checkout;
