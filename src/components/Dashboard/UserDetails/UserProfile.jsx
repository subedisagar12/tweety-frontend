import React, { useContext } from "react";
import { Link } from "react-router-dom";
import no_profile from "../../../images/no_profile.png";
import { URLContext } from "../../../API/URL";
const UserProfile = ({ user }) => {
  const [url] = useContext(URLContext);

  if (user) {
    const imageUrl = url + "/" + user.profileImage;
    return (
      <section id="profile_display" className="user_profile">
        <div className="top user_info">
          <div className="image_section">
            <img
              src={user.profileImage === "" ? no_profile : `${imageUrl}`}
              alt=""
            />
          </div>
          <div className="name_section">
            <h5 className="user_name">
              <a href="#">{user.name}</a>
            </h5>
          </div>
          <hr />
        </div>
        <div className="follow_info">
          <div className="followers">
            <span className="data">
              <span className="value follower-value">
                {user.followers.length}
              </span>
              <span className="follow-info ml-1">followers</span>
            </span>
          </div>
          <div className="following">
            <span className="data">
              <span className="value following  -value">
                {user.following.length}
              </span>
              <span className="follow-info"> following</span>
            </span>
          </div>
        </div>
      </section>
    );
  } else {
    return <h1>Fetching info.....</h1>;
  }
};

export default UserProfile;
