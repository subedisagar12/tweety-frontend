import React from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
const UserDashboard = ({ isLoggedIn }) => {
  let history = useHistory();
  let params = useParams();
  if (!isLoggedIn) {
    history.push("/");
  } else {
    return <h3 className="mt-5">User Dashboard of user-{params.user_id}</h3>;
  }
};

export default UserDashboard;
