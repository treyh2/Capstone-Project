import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className='App'>
        <img id='comp-img' src='./kicks.jpeg'></img>
        <p>For the sneaker heads</p>
    </div>

    <div className='Login'> 
    <Login />
    </div>
    </>
  );
}

export default App;
