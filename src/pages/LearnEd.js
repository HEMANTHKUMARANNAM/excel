import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LearnEd = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-light">
      {/* Navigation Bar */}
      <nav
        className={`navbar navbar-expand-lg fixed-top ${scroll ? "shadow bg-white" : "bg-transparent"}`}
      >
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="images/icon/logo.png" alt="logo" className="w-25" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#portfolio_section">Portfolio</a></li>
              <li className="nav-item"><a className="nav-link" href="#team_section">Team</a></li>
              <li className="nav-item"><a className="nav-link" href="#services_section">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#contactus_section">Contact</a></li>
            </ul>
            <form className="d-flex ms-3">
              <input className="form-control me-2" type="search" placeholder="Search here..." />
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
            <a className="btn btn-danger ms-3" href="login.html">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container text-center mt-5 pt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold">The beautiful thing about learning is that nobody can take it away from you</h1>
            <p className="text-muted">Education is the process of facilitating learning, or the acquisition of knowledge, skills, values, beliefs, and habits...</p>
            <a className="btn btn-outline-danger" href="https://www.youtube.com/watch?v=KFyrgDO1WXk" target="_blank" rel="noopener noreferrer">Watch Now</a>
          </div>
          <div className="col-md-6">
            <img src="images/extra/svg1.jpg" alt="svg" className="img-fluid shadow rounded" />
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contactus_section" className="container py-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <form className="w-50 mx-auto">
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="First Name" required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="mb-3">
            <textarea className="form-control" placeholder="Message" required></textarea>
          </div>
          <button type="submit" className="btn btn-danger w-100">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">Copyright © 2025 Created By Roshan Kumar, Abhishek Dulat. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LearnEd;
