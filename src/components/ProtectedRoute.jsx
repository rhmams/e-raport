import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Cek apakah user sudah login
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // Jika belum login, redirect ke halaman login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // Jika sudah login, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;