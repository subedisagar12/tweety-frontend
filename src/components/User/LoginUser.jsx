import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

import "./User.css";
// context import
import { LoggedInUserContext, URLContext } from "../../API/URL";
const LoginUser = () => {
  const [url] = useContext(URLContext);
  const [loggedUser, setLoggedUser] = useContext(LoggedInUserContext);
  const [serverResults, setServerResults] = useState({
    data: {},
    success: "",
    error: "",
  });

  const [credentials, setCredentials] = useState({
    email: sessionStorage.getItem("email") || "",
    password: sessionStorage.getItem("password") || "",
  });

  const BindData = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const LogUser = () => {
    axios
      .post(`${url}/user/login`, credentials)
      .then((res) => {
        setServerResults({
          data: res.data.data,
          success: res.data.success,
          error: res.data.error,
        });

        if (res.data.success !== "") {
          sessionStorage.setItem("email", credentials.email);
          sessionStorage.setItem("password", credentials.password);
          setLoggedUser(res.data.data);
        }
      })
      .catch((e) => console.log(e));
    // console.log("Function Called");
  };

  const LoginUser = (e) => {
    e.preventDefault();
    LogUser();
  };

  useEffect(() => {
    if (credentials.email !== "" && credentials.password !== "") {
      LogUser();
    }
    return;
  }, [loggedUser]);
  return (
    <section className="user_section">
      <div className="form-area">
        <div className="form-header">
          <h4 className="form-heading">Tweety Login</h4>
        </div>
        <div className="form-body">
          <form action="">
            {serverResults.error !== "" ? (
              <Alert severity="error">{serverResults.error}</Alert>
            ) : null}
            {/* Email input */}
            <div className="form-group mt-2">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={(e) => BindData(e)}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={(e) => BindData(e)}
              />
            </div>

            <div className="submit-button">
              <button className="btn btn-sm" onClick={(e) => LoginUser(e)}>
                Login
              </button>
            </div>
            <Link to="/user/register">
              <p className="link text-center mt-1">
                New to Tweety? Register for free!!
              </p>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginUser;
