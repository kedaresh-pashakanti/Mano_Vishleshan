import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(true);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setToken(false);
    setUser(null);
    navigate("/login");
  };

  const routes = [
    "home",
    "blogs",
    "healthProblems",
    "quiz",
    "sessions",
    "videos",
    "aboutus",
  ];

  const formatRouteName = (route) => {
    if (route === "home") return "Home";
    if (route === "quiz") return "Test";
    if (route === "healthProblems") return "Health Problems";
    if (route === "sessions") return "Doctors";
    if (route === "aboutus") return "About Us";
    if (route === "diary") return "Diary";
    return route.charAt(0).toUpperCase() + route.slice(1);
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Prescripto-style Navigation Header */}
      <header className="bg-white border-b border-border-light shadow-sm">
        <div className="container mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo - Left aligned */}
          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 flex items-center justify-center bg-accent rounded-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <NavLink to="/" className="text-xl font-serif font-semibold text-dark-text hover:text-accent transition-colors">
              MANOVISHLESHAN
            </NavLink>
          </div>
          
          {/* Desktop Navigation - Center aligned */}
          <nav className="hidden md:flex items-center space-x-8">
            {routes.map((route) => (
              <NavLink
                key={route}
                to={`/${route}`}
                className={({ isActive }) =>
                  `text-dark-text font-medium transition-colors duration-200 hover:text-accent ${
                    isActive 
                      ? "text-accent border-b-2 border-accent pb-1" 
                      : ""
                  }`
                }
              >
                {formatRouteName(route)}
              </NavLink>
            ))}
          </nav>
          
          {/* Profile Section - Right aligned */}
          {token && (
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <div
                  className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-soft-bg transition-colors"
                  onClick={toggleProfileMenu}
                >
                  <img
                    className="w-8 h-8 rounded-full border-2 border-border-light"
                    src={assets.profile_pic}
                    alt="Profile"
                  />
                  <svg
                    className="w-4 h-4 text-dark-text"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-border-light rounded-card shadow-card z-50">
                    <div
                      onClick={() => navigate("/my-profile")}
                      className="block px-4 py-3 text-dark-text hover:bg-soft-bg cursor-pointer transition-colors"
                    >
                      My Profile
                    </div>
                    <div
                      onClick={() => navigate("/my-appointments")}
                      className="block px-4 py-3 text-dark-text hover:bg-soft-bg cursor-pointer transition-colors"
                    >
                      My Appointments
                    </div>
                    <div className="border-t border-border-light">
                      <div
                        onClick={handleLogout}
                        className="block px-4 py-3 text-error hover:bg-error/10 cursor-pointer transition-colors"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              className="text-dark-text focus:outline-none p-2"
              onClick={toggleMobileMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu - Prescripto style */}
      {isOpen && (
        <nav className="md:hidden bg-white border-b border-border-light">
          <div className="container mx-auto px-8 py-4">
            <div className="space-y-4">
              {routes.map((route) => (
                <NavLink
                  key={route}
                  to={`/${route}`}
                  onClick={toggleMobileMenu}
                  className={({ isActive }) =>
                    `block text-dark-text font-medium transition-colors duration-200 hover:text-accent py-2 ${
                      isActive 
                        ? "text-accent border-l-4 border-accent pl-4" 
                        : ""
                    }`
                  }
                >
                  {formatRouteName(route)}
                </NavLink>
              ))}
              {token && (
                <div className="border-t border-border-light pt-4">
                  <div
                    onClick={() => {
                      toggleMobileMenu();
                      navigate("/my-profile");
                    }}
                    className="block text-dark-text hover:text-accent cursor-pointer py-2 transition-colors"
                  >
                    My Profile
                  </div>
                  <div
                    onClick={() => {
                      toggleMobileMenu();
                      navigate("/my-appointments");
                    }}
                    className="block text-dark-text hover:text-accent cursor-pointer py-2 transition-colors"
                  >
                    My Appointments
                  </div>
                  <div
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="block text-error hover:text-error/80 cursor-pointer py-2 transition-colors"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
