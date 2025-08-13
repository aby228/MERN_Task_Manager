// Registration page: creates account then routes to dashboard
import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import AuthContext from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

  // Submit registration details and show a toast based on the outcome
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await register(username, email, password);

    if (result.ok) {
      toast.success('Registration successful!');

      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>

          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>

          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>

          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
