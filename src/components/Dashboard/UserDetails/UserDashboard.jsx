import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./UserDashboard.css";
import {
  URLContext,
  LoggedInUserContext,
  getAllPostOfUser,
} from "../../../API/URL";
import UserProfile from "./UserProfile";
import UserPost from "./UserPost";
const UserDashboard = () => {
  let history = useHistory();
  let params = useParams();
  const [user, setUser] = useState(null);
  const [userPost, setUserPost] = useState(null);
  const [url] = useContext(URLContext);
  const [loggedUser] = useContext(LoggedInUserContext);
  const getUserInfo = () => {
    if (loggedUser) {
      axios({
        method: "get",
        url: `${url}/user/${params.user_id}`,
        headers: { "auth-user-id": loggedUser._id },
      })
        .then((res) => setUser(res.data.data))
        .catch((e) => console.log(e.message));
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [loggedUser]);

  useEffect(() => {
    const getData = async () => {
      console.log(params.user_id);
      console.log(loggedUser._id);
      let data = await getAllPostOfUser(params.user_id, loggedUser._id);
      setUserPost(data);
    };
    if (loggedUser) {
      getData();
    } else {
      return null;
    }
  }, [loggedUser]);
  return (
    <section id="user-dashboard">
      <div className="row">
        <div className="col-md-3 user-profile">
          <UserProfile user={user} />
        </div>
        <div className="col-md-6 user-posts">
          <UserPost userPost={userPost} />
        </div>
        <div className="col-md-3 user-info">
          {/* Mutual Follower section goes here */}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
