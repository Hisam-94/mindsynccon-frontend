import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          {user ? (
            <div>
              <span className="mr-4">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
