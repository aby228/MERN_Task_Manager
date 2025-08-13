// Route guard: renders children for authenticated users, otherwise redirects to login
import React, { useContext } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // Defer route decision until auth status resolves
  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
