import React, { useContext } from "react";
import "./Navbar.css";
import { LoggedInUserContext } from "../API/URL";
const Navbar = () => {
  const [loggedUser, setLoggedUser] = useContext(LoggedInUserContext);
  const logout = () => {
    setLoggedUser(null);
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
  };
  return (
    <section id="navbar">
      <nav className="navbar navbar-expand-md primary_nav">
        <div className="container">
          <a href="#" className="navbar-brand">
            Tweety
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="" className="nav-link" onClick={() => logout()}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
