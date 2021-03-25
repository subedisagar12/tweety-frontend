import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import no_profile from "../../images/no_profile.png";
import { ProfileEdit } from "../ComponentsImport";
import { URLContext } from "../../API/URL";

const ProfileDisplay = ({ loggedUser }) => {
  const [url] = useContext(URLContext);
  const imageUrl = url + "/" + loggedUser.profileImage;
  const [file, setFile] = useState("");
  const [display, setDisplay] = useState("d-none");

  const changeDisplay = (e) => {
    e.preventDefault();
    if (display === "d-none") {
      setDisplay("d-block");
    } else {
      setDisplay("d-none");
      setFile("");
    }
  };
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

      <div className="actions mt-3">
        <button className="btn btn-sm btn-block view-profile action-button">
          View Profile
        </button>

        <button
          className="btn btn-sm btn-block edit-profile action-button"
          onClick={(e) => changeDisplay(e)}
        >
          Edit Info
        </button>

        <div id="profile_edit_container" className={display}>
          <ProfileEdit
            changeDisplay={changeDisplay}
            file={file}
            setFile={setFile}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileDisplay;
