import React from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const type = user?.type;

  return (
    <nav className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          Movie Booking App
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/" className="hover:text-blue-200">
                Home
              </Link>
              <Link to="/bookings" className="hover:text-blue-200">
                My Bookings
              </Link>
              {type === "admin" && (
                <Link to="/admin" className="hover:text-blue-200">
                  Admin
                </Link>
              )}
              <Link to="/logout" className="hover:text-blue-200">
                Logout
              </Link>
              {user && (
                <span className="text-sm">Welcome, {user.username}!</span>
              )}
            </>
          ) : (
            <Link to="/Login" className="hover:text-blue-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
