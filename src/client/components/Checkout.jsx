import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
          quantity: item.quantity
        }))
      };

      // Send POST request to create the order
      const response = await axios.post('/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch orders after placing the order successfully
      const ordersResponse = await axios.get('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(ordersResponse.data);

      // Clear user's cart
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
      <h2>Checkout</h2>
      {checkoutComplete ? (
        <div>
          <p>Order successfully placed!</p>
          <h3>Order History</h3>
          <ul>
            {orders.map(order => (
              <li key={order.id}>{order.name} - ${order.totalPrice}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {/* Display cart items */}
          {cartItems.map(item => (
            <div key={item.id}>
              <p>{item.name} - ${item.price} - Quantity: {item.quantity}</p>
            </div>
          ))}
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
