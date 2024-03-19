// Login.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async() => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify({
          email,
          password
        })
      });
     
      if (!response.ok) {
        let errorMessage = 'An error occurred. Please try again.';
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (error) {
          console.error('Error parsing error response:', error);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setMessage(result.message);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Error:', err);
      setMessage(err.message)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
    <header>
        <nav>
          <div className='NavBar'>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/catalog'>Catalog</NavLink>
            <NavLink to='/login'>Login</NavLink>
          </div>
        </nav>
      </header>
    <div className="Login-container">
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
      <p>{message}</p>
    </div>
    </>
  );
};

export default Login;
