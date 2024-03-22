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

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/api/users/current-user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
      setToken(null);
      setCurrentUser(null);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); 
  };

  // Function to handle logout
  

  return (
    <>
      <Routes>
        <Route path='/catalog' element={<Catalog currentUser={currentUser} />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setToken={handleLogin} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/shoe/:name' element={<ShoeDetails token={token} />} />
        <Route path='/cart' element={<Cart currentUser={currentUser} />} />
      </Routes>
    </>
  );
}

export default App;
