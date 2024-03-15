import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import Catalog from './components/Catalog';
import Login from './components/Login';
import './style.css'

function App() {

  return (
    <>
    <header>
      <nav>
        <div className='NavBar'>
        <NavLink to = '/Home'>Home</NavLink>
        <NavLink to = '/catalog'>Catalog</NavLink>
        </div>
      </nav>
    </header>
    <div className='Home'>
      <img id='kicks-img' src='./kicks.jpeg' alt='kicks' />
      <p>For the sneaker heads</p>
    </div>

    <Routes>
      <Route path = '/catalog' element = {<Catalog />} />
    </Routes>
   

    <div className='Login'> 
    <Login />
    </div>
    </>
  );
}

export default App;