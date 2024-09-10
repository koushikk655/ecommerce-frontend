import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Ensure this path is correct

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Ensure useAuth is implemented and imported correctly

  // You can add role-based logic here if needed
  // For example, to allow access based on role:
  // if (role === 'admin') {
  //   return isAuthenticated ? element : <Navigate to="/login" />;
  // }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
