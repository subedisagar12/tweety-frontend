import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
// context api import
import { URLContext } from "../../API/URL";

const RegisterUser = () => {
  const [url] = useContext(URLContext);

  const initialState = {
    name: "",
    email: "",
    password: "",
    re_password: "",
    gender: "male",
    profileImage: "",
  };
  const [userInfo, setUserInfo] = useState(initialState);
  const [serverResults, setServerResults] = useState({
    data: {},
    success: "",
    error: "",
  });

  // function to bindInput
  const BindInput = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  // function to register user

  const RegisterUser = (e) => {
    e.preventDefault();

    if (userInfo.password !== userInfo.re_password) {
      setServerResults({
        ...serverResults,
        error: "Passwords doesnot match",
      });
    } else {
      axios
        .post(`${url}/user/register`, userInfo)
        .then((res) =>
          setServerResults({
            ...serverResults,
            data: res.data.data,
            success: res.data.success,
            error: res.data.error,
          })
        )
        .then(setUserInfo(initialState))
        .catch((e) => setServerResults({ ...serverResults, error: e.message }));
    }
  };

  return (
    <section className="user_registration_section">
      <div className="form-area">
        <div className="form-header">
          <h4 className="form-heading">Tweety Registration</h4>
        </div>
        <div className="form-body">
          <form action="" encType="multipart/form-data">
            {serverResults.error !== "" ? (
              <Alert severity="error">{serverResults.error}</Alert>
            ) : null}
            {serverResults.success !== "" ? (
              <Alert severity="success">{serverResults.success}</Alert>
            ) : null}
            <div className="form-group mt-2">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={(e) => BindInput(e)}
              />
            </div>
            {/* Email input */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={(e) => BindInput(e)}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Choose a password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={userInfo.password}
                onChange={(e) => BindInput(e)}
              />
            </div>

            {/* Re Enter password */}
            <div className="form-group">
              <label htmlFor="re_password">Re-Enter Password</label>
              <input
                type="password"
                className="form-control"
                id="re_password"
                name="re_password"
                value={userInfo.re_password}
                onChange={(e) => BindInput(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Gender">Gender: </label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={(e) => BindInput(e)}
                  defaultChecked
                />
                <label htmlFor="male" className="form-check-label">
                  Male
                </label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={(e) => BindInput(e)}
                />
                <label htmlFor="female" className="form-check-label">
                  Female
                </label>
              </div>
            </div>
            {serverResults.error !== "" ? (
              <Alert severity="error">{serverResults.error}</Alert>
            ) : null}
            {serverResults.success !== "" ? (
              <Alert severity="success">{serverResults.success}</Alert>
            ) : null}
            <div className="submit-button mt-2">
              <button className="btn btn-sm " onClick={(e) => RegisterUser(e)}>
                Register me
              </button>
            </div>
          </form>
        </div>
        <Link to="/">
          <p className="link text-center mb-2">I already have an account</p>
        </Link>
      </div>
    </section>
  );
};

export default RegisterUser;
