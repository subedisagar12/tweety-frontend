import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { LoggedInUserContext, URLContext } from "../../API/URL";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { LogUser } from "../User/LoginUser";
const ProfileEdit = ({ changeDisplay, file, setFile }) => {
  const [loggedUser] = useContext(LoggedInUserContext);
  const [url] = useContext(URLContext);
  const [serverResponse, setServerResponse] = useState({
    data: {},
    success: "",
    error: "",
  });
  const [editedInfo, setEditedInfo] = useState({
    name: loggedUser.name,
    profileImage: null,
  });

  const onChangeName = (e) => {
    setEditedInfo({ ...editedInfo, name: e.target.value });
  };

  const onChangeFile = (e) => {
    setEditedInfo({ ...editedInfo, profileImage: e.target.files[0] });
  };
  useEffect(() => {
    if (editedInfo.profileImage) {
      setFile(URL.createObjectURL(editedInfo.profileImage));
    }
  }, [editedInfo.profileImage]);

  const onSubmitEdit = (e) => {
    let formData = new FormData();
    formData.append("name", editedInfo.name);
    formData.append("profileImage", editedInfo.profileImage);
    e.preventDefault();
    if (editedInfo.name === "") {
      return;
    }

    axios({
      method: "post",
      url: `${url}/user/update/${loggedUser._id}`,
      headers: {
        "auth-user-id": loggedUser._id,
      },
      data: formData,
    })
      .then((res) =>
        setServerResponse({
          ...serverResponse,
          data: res.data.data,
          success: res.data.success,
          error: res.data.error,
        })
      )
      .catch((e) => setServerResponse({ ...serverResponse, error: e.message }));
  };

  return (
    <section id="edit_profile">
      {serverResponse.error !== "" ? (
        <Alert severity="error" className="error">
          {serverResponse.error}
        </Alert>
      ) : null}
      {serverResponse.success !== "" ? (
        <Alert severity="success" className="error">
          {serverResponse.success}
        </Alert>
      ) : null}
      <form action="" className="form" encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className=" form-control"
            name="name"
            value={editedInfo.name}
            onChange={(e) => onChangeName(e)}
          />
        </div>

        <div className="custom-file">
          <label className="custom-file-label" htmlFor="name">
            Change Profile Image
          </label>
          <input
            type="file"
            className=" custom-file-input"
            name="profileImage"
            accept="image/jpeg, image/png"
            onChange={(e) => onChangeFile(e)}
          />
        </div>
        {file !== "" ? (
          <div className="selected-image-container">
            <img src={file} className="selected-image" />
          </div>
        ) : null}
        <button
          className="btn btn-sm mt-3 mx-3 save-changes-btn"
          onClick={(e) => onSubmitEdit(e)}
        >
          Save Changes
        </button>

        <button
          className="btn btn-sm mt-3 mx-1 cancel-btn"
          onClick={(e) => changeDisplay(e)}
        >
          Cancel
        </button>
      </form>
    </section>
  );
};

export default ProfileEdit;
