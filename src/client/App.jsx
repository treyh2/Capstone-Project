//src/client/app.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import axios from 'axios'; // Import axios for making HTTP requests
import Catalog from './components/Catalog';
import Login from './components/Login';
import Home from './components/Home';
import ShoeDetails from './components/ShoeDetails';
import Register from './components/Register';
import Cart from './components/Cart';
import './style.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch current user information
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/api/users/current', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
      // If there's an error fetching user data, clear token and current user
      setToken(null);
      setCurrentUser(null);
      localStorage.removeItem('token'); // Remove token from localStorage
    }
  };

  // Fetch current user information when token changes
  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  // Function to handle successful login
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Store token in localStorage
  };

  // Function to handle logout
  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  return (
    <>
      <Routes>
        <Route path='/catalog' element={<Catalog currentUser={currentUser} />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setToken={handleLogin} />} />
        <Route path='/register' element={<Register />} />
        {/* Pass currentUser as a prop to ShoeDetails */}
        <Route path='/shoe/:name' element={<ShoeDetails currentUser={currentUser} />} />
        <Route path='/cart' element={<Cart currentUser={currentUser} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
