import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import no_profile from "../../images/no_profile.png";

import { URLContext } from "../../API/URL";

const ProfileDisplay = ({ loggedUser }) => {
  const [url] = useContext(URLContext);
  const imageUrl = url + "/" + loggedUser.profileImage;

  return (
    <section id="profile_display">
      <div className="top user_info">
        <div className="image_section">
          <img
            src={loggedUser.profileImage === "" ? no_profile : `${imageUrl}`}
            alt=""
          />
        </div>
        <div className="name_section">
          <h5 className="user_name">
            <a href="#">{loggedUser.name}</a>
          </h5>
        </div>
      </div>
      <div className="follow_info">
        <div className="followers">
          <span>
            {loggedUser.followers.length} <a href="#">followers</a>
          </span>
        </div>
        <div className="following">
          <span>
            {loggedUser.following.length} <a href="#">following</a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProfileDisplay;
