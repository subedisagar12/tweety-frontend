import React, { useContext, useEffect } from "react";
import noImage from "../../images/no_profile.png";
import "./People.css";
import {
  URLContext,
  Follow,
  UnFollow,
  LoggedInUserContext,
} from "../../API/URL";

const PeopleList = ({ user }) => {
  const [url] = useContext(URLContext);
  const [loggedUser, setLoggedUser] = useContext(LoggedInUserContext);
  const imageUrl = url + "/" + user.profileImage;

  return (
    <section>
      {user ? (
        <div className="root">
          <div className="left img-container">
            <img
              src={user.profileImage === "" ? noImage : `${imageUrl}`}
              alt=""
              className="recommendation_img"
            />
          </div>
          <div className="middle info-container">
            <span>{user.name}</span>
          </div>

          <div className="right follow-container">
            {loggedUser.following.includes(user._id) ? (
              <a
                href="#"
                onClick={() => UnFollow(user._id, loggedUser, setLoggedUser)}
                className="unfollow"
              >
                Unfollow
              </a>
            ) : (
              <a
                href="#"
                onClick={() => Follow(user._id, loggedUser, setLoggedUser)}
                className="follow"
              >
                Follow
              </a>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default PeopleList;
