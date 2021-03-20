import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  CreateTweet,
  ProfileDisplay,
  PeopleYouMayKnow,
  DisplayTweet,
} from "../ComponentsImport";
import { URLContext } from "../../API/URL";
const HomePage = ({ loggedUser }) => {
  const {
    name,
    email,
    gender,
    profileImage,
    followers,
    following,
  } = loggedUser;

  const [allUser, setAllUser] = useState(null);

  let [url] = useContext(URLContext);
  useEffect(() => {
    const fetchAllUsers = async () => {
      let users = null;
      await axios({
        method: "get",
        headers: { "auth-user-id": loggedUser._id },
        url: `${url}/user/all`,
      })
        .then((res) => {
          users = res.data.data;
        })
        .catch((e) => console.log(e.message));

      let filtered_user = await users.filter(
        (item) => item._id !== loggedUser._id
      );
      setAllUser(filtered_user);
    };
    fetchAllUsers();
  }, [loggedUser]);
  return (
    <section id="home" className="row">
      <section className="profile col-md-3">
        <ProfileDisplay loggedUser={loggedUser} />
      </section>
      <section className="tweets col-md-6">
        <CreateTweet loggedUser={loggedUser} />
        <DisplayTweet />
      </section>
      <section className="activities col-md-3">
        <div className="recommendation">
          <PeopleYouMayKnow
            recommendedUsers={allUser}
            loggedUser={loggedUser}
          />
        </div>
      </section>
    </section>
  );
};

export default HomePage;
