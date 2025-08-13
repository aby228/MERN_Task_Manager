// Login page: authenticates and routes to dashboard on success
import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // Submit credentials and show a toast based on the outcome
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (result.ok) {
      toast.success('Login successful!');

      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Login failed. Invalid credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
