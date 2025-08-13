// App shell: global navigation, notifications, and route definitions
// Routes are split into public and protected sections
import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';

import Register from './pages/Register';

import Login from './pages/Login';

import Dashboard from './pages/Dashboard';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      {/* Always-visible navigation bar */}
      <Navbar />

      {/* Non-blocking notifications (success/errors, etc.) */}
      <ToastContainer />

      <div className="container">
        {/* Route table: add pages here */}
        <Routes>
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          {/* Protected area: users must be authenticated */}
          <Route path="/dashboard" element={<PrivateRoute />}>
            {/* Rendered when the parent route matches and auth passes */}
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="/" element={<h1>Welcome to Task Manager!</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
