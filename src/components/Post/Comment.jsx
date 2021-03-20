import React, { useState, useEffect, useContext } from "react";
import no_image from "../../images/no_profile.png";
import axios from "axios";
import "./Comment.css";
import { URLContext, LoggedInUserContext } from "../../API/URL";
const Comment = ({ comments }) => {
  const [author, setAuthor] = useState({});
  const [url] = useContext(URLContext);
  const [loggedUser] = useContext(LoggedInUserContext);

  const [imageUrl, setImageUrl] = useState(null);

  const getAuthor = async (author_id) => {
    await axios({
      method: "get",
      url: `${url}/user/${author_id}`,
      headers: { "auth-user-id": loggedUser._id },
    })
      .then((res) => setAuthor(res.data.data))
      .then((res) => setImageUrl(res.data.data.profileImage));
  };

  return (
    <div className="comment-display-section">
      {comments.map((item, id) => (
        <div className="comment-display" key={id}>
          {getAuthor(item.commented_by)}
          <div className="comment-heading">
            <div className="image-section">
              <img src={author.profileImage ? imageUrl : no_image} alt="" />
            </div>
            <div className="info-section">
              <div className="name">
                <span>{author.name} comments</span>
              </div>
              <div className="date">
                <span>{item.created_at}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="comment-body">{item.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
