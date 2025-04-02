import React, { useContext, useState, useEffect } from "react";
import { useTheme } from "../ThemeContext"; // Import Theme Context
import { AuthContext } from "../utility/AuthContext";
import { Image } from "react-bootstrap"; // Import Bootstrap Image component
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for routing
import icon from "../assets/icon.png";
import { Button } from "react-bootstrap";

import accounticonlight from "../assets/accountlight.png";
import accounticondark from "../assets/accountdark.png";

import lightmode from "../assets/lightmode.png";
import darkmode from "../assets/darkmode.png";

import back_black from "../assets/back-black.png";
import back_light from "../assets/back-white.png";

import exam_black from "../assets/exam_dark.png";
import exam_light from "../assets/exam_light.png";

const MainNavbar = ({ command, showDashboard }) => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme from ThemeContext
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [photoURL, setPhotoURL] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for routing

  // Set photoURL when user is authenticated
  useEffect(() => {
    if (user) {
      setPhotoURL(user.photoURL); // Update photoURL with user's profile picture
    }
  }, [user]);

  function handledashboardclick() {
    navigate("/dashboard");
  }

  // Fallback handler when the profile photo fails to load
  const handleImageError = () => {
    setPhotoURL(null); // Use default icon if image fails to load
  };

  // Navigate to the profile page
  const handleProfileClick = () => {
    navigate("/profile"); // Redirect based on authentication status
  };

  // Navigate back to home
  const prevWindow = () => {
    navigate(`/home`);
  };

  // Dynamic classes based on theme
  const navbarBgClass = theme === "light" ? "bg-light" : "bg-dark";
  const navbarTextClass = theme === "light" ? "text-dark" : "text-light";


  return (
    <nav className={`navbar navbar-expand-lg ${navbarBgClass} ${navbarTextClass}`}>
      <div className="container-fluid">
        {/* Back Button */}
        {command && (
          <Image
            src={theme === "light" ? back_black : back_light}
            alt="Back"
            roundedCircle
            width={30}
            height={30}
            className="me-2"
            onClick={prevWindow}
            style={{ cursor: "pointer" }}
          />
        )}

        {/* App Logo */}
        <Link to="/home">
          <Image src={icon} alt="App Icon" className="me-2" width={30} height={30} />
        </Link>

        {/* App Name */}
        <Link
          to="/home"
          className="navbar-brand"
          style={{
            color: theme === "light" ? "rgb(29, 30, 35)" : "#f8f9fa",
            textDecoration: "none",
          }}
        >
          {user ? user.displayName || "App Name" : "Excel"}
        </Link>

        {/* Navbar Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Right-Side Navigation */}
          <ul className="navbar-nav ms-auto align-items-center">
            

            {/* Dashboard Icon */}
            {showDashboard && user && (
              <div style={{ paddingRight: '20px' }}>
                <Button
                  variant="primary"
                  className="ms-3"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: theme === "light" ? "black" : "white"
                  }}
                  onClick={handledashboardclick}
                >
                  Dashboard
                </Button>
              </div>
            )}

            {/* Exam Icon */}
            {user && (
              <Image
                src={theme === "light" ? exam_black : exam_light}
                alt="Exam"
                roundedCircle
                width={30}
                height={30}
                className="me-2"
                onClick={() => navigate("/quiz")} // Corrected onClick
                style={{ cursor: "pointer", marginRight: "30px" }}
              />
            )}

            {/* User Profile or Default Login Icon */}
            <li
              className="nav-item d-flex align-items-center me-3"
              style={{ cursor: "pointer" }}
              onClick={handleProfileClick}
            >
              {user && photoURL ? (
                <Image
                  src={photoURL}
                  alt="Profile"
                  roundedCircle
                  width={30}
                  height={30}
                  className="me-2"
                  onError={handleImageError}
                />
              ) : (
                <Image
                  src={theme === "light" ? accounticondark : accounticonlight}
                  alt="Default Profile"
                  roundedCircle
                  width={30}
                  height={30}
                  className="me-2"
                />
              )}
              <span>{user ? user.displayName || "User" : "Login"}</span>
            </li>

            {/* Theme Toggle Button */}
            <li className="nav-item">
              <Image
                src={theme === "light" ? darkmode : lightmode}
                alt="Toggle Theme"
                roundedCircle
                width={30}
                height={30}
                className="me-2"
                onClick={toggleTheme}
                style={{ cursor: "pointer" }}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
