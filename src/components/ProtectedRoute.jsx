import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const isLoggedIn  = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  console.log("isLoggedIn", isLoggedIn);
  console.log("user", user);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
