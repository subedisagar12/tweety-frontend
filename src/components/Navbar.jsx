import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <section id="navbar">
      <nav className="navbar navbar-expand-md primary_nav">
        <div className="container">
          <a href="#" className="navbar-brand">
            Tweety
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="" className="nav-link">
                Tweet
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
