import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Catalog from './components/Catalog';
import Login from './components/Login';
import Home from './components/Home';
import ShoeDetails from './components/ShoeDetails';
import Register from './components/Register';
import './style.css';

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch current user information, you can replace this with your own logic
  const fetchCurrentUser = async () => {
    try {
      // Fetch current user information from your backend using the token
      const response = await axios.get('/api/users/current', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
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

  return (
    <>
      <Routes>
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/register' element={<Register />} />
        {/* Pass currentUser as a prop to ShoeDetails */}
        <Route path='/shoe/:name' element={<ShoeDetails currentUser={currentUser} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
