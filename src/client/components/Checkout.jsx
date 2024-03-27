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

    fetchCartItems(); 
  }, []);

  useEffect(() => {
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
      fetchOrderHistory(); 
    }
  }, [checkoutComplete]);

  const generateRandomOrderNumber = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');

      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

      const orderNumber = generateRandomOrderNumber();

      const orderData = {
        orderNumber: orderNumber,
        totalPrice: totalPrice,
        items: cartItems.map(item => ({
          shoeId: item.id,
          name: item.name,
          price: item.price,
          size: item.size, 
          imageUrl: item.imageUrl, 
          quantity: item.quantity
        }))
      };

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

      setCheckoutComplete(true);
    } catch (error) {
      console.error('Error placing order:', error);
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
