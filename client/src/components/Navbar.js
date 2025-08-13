// Top navigation displaying auth-aware links
import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <h1>Task Manager</h1>

      <div>
        {/* If authenticated, show dashboard and logout. Otherwise, show auth links. */}
        {user ? (
          <>
            <span>Welcome, {user.username}</span>

            <button onClick={logout}>Logout</button>

            <Link to="/dashboard">Dashboard</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
