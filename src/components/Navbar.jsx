import React, { useContext } from "react";
import "./Navbar.css";
import { LoggedInUserContext } from "../API/URL";
import { Link, useHistory } from "react-router-dom";
const Navbar = ({ isLoggedIn }) => {
  const [loggedUser, setLoggedUser] = useContext(LoggedInUserContext);
  let history = useHistory();
  const logout = () => {
    setLoggedUser(null);
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    history.push("/");
  };
  return (
    <section id="navbar">
      <nav className="navbar navbar-expand-md primary_nav">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Tweety
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              {isLoggedIn ? (
                <Link to="/" className="nav-link">
                  Home
                </Link>
              ) : null}
            </li>

            <li className="nav-item">
              {isLoggedIn ? (
                <a href="" className="nav-link" onClick={() => logout()}>
                  Logout
                </a>
              ) : null}
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
