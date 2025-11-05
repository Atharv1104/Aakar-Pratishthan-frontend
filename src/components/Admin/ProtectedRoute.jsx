import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Get token directly from localStorage
  const token = localStorage.getItem('token');

  // If token exists, render the child routes (the Admin Dashboard)
  // Otherwise, redirect to the login page, replacing the history
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;

