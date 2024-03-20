import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

      const registerUser = async () => {
          try {
              const response = await fetch('http://localhost:3000/api/users/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      email,
                      password,
                      firstname,
                      lastname,
                      address,
                      city,
                      state,
                      zipcode
                  })
              });
              const result = await response.json();
              setMessage(result.message);
              if (!response.ok) {
                  throw new Error(result.message);
              }
              setEmail('');
              setPassword('');
              setFirstName('');
              setLastName('');
              setStreet('');
              setCity('');
              setState('');
              setZipcode('');
          } catch (err) {
              console.error(`Error during registration: ${err}`);
              setMessage(err.message);
          }
      };

      async function handleSubmit(event) {
        event.preventDefault();
    
        try {
            const payload = {
                firstname,
                lastname,
                email,
                password,
                address,
                city,
                state,
                zipcode,
            };
    
            // Perform the registration request
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
    
            // Check if the registration was successful
            if (response.ok) {
                // Registration successful, set the message
                setMessage('Thanks for signing up! Please sign in');
    
                // Redirect to login page after a delay
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
    
                // Optionally, you can set the token here if needed
                // const user = await response.json();
                // setToken(user.token);
            } else {
                // Registration failed, handle the error
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (err) {
            // Handle any errors during registration
            console.error(err);
            setMessage(err.message);
        }
    }
    

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            id='firstName'
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            type='text'
            id='lastName'
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='address'>Street Address:</label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='city'>City:</label>
          <input
            type='text'
            id='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='state'>State:</label>
          <input
            type='text'
            id='state'
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='zip'>Zip Code:</label>
          <input
            type='text'
            id='zip'
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </div>
        <div className='form-footer'>
          <Link to='/login' className='register-route'>
            Already have an account? Login
          </Link>
          <button type='submit'>Register</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;