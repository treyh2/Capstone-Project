import { Routes, Route, NavLink } from 'react-router-dom'; 
import Catalog from './components/Catalog';
import Login from './components/Login';
import Home from './components/Home';
import './style.css';

function App() {
  return (
    <>
      

      <Routes>
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
