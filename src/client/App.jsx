import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Catalog from './components/Catalog';
import Login from './components/Login';
import Home from './components/Home';
import ShoeDetails from './components/ShoeDetails';
import Register from './components/Register';
import './style.css';


function App() {
  const [token, useToken] = useState(null)
  return (
    <>
      

      <Routes>
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/shoe/:name' element={<ShoeDetails />} />
      </Routes>
    </>
  );
}

export default App;
