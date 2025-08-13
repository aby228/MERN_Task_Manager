// Lightweight auth context using httpOnly JWT stored in cookie
// Exposes: user, loading, login, register, logout
import React, { createContext, useState, useEffect } from 'react';

import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, ask the backend for the current user's profile.
    // If the token cookie is valid, the server returns user data.
    const loadUser = async () => {
      try {
        const res = await axios.get('/api/auth/profile');

        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });

      setUser(res.data);

      return { ok: true };
    } catch (err) {
      // Swallow network/validation noise and report structured errors upstream if needed
      const message = err?.response?.data?.message || err.message || 'Login failed';
      console.error(message);

      return { ok: false, message };
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      setUser(res.data);

      return { ok: true };
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Registration failed';
      console.error(message);

      return { ok: false, message };
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');

      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
