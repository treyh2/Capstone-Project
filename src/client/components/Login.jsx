import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; 
import '../styles/Login.css';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) {
        setToken(result.token);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/catalog');
        }, 3000);
      } else {
        throw result;
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className='login-container'>
      <header className='header'>
        <div className='navbar'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/catalog'>Catalog</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </div>
      </header>
      <div className='login-box'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type='submit'>Login</button>
        </form>
        {message && <p>{message}</p>}
        <Link to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default Login;
