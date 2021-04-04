import React, { useState, useEffect, useContext } from "react";
import no_image from "../../images/no_profile.png";

import "./Comment.css";
import { URLContext, getUser, LoggedInUserContext } from "../../API/URL";
const Comment = ({ comments }) => {
  const [url] = useContext(URLContext);
  const [loggedUser] = useContext(LoggedInUserContext);
  const [fullComment, setFullComment] = useState(null);

  useEffect(() => {
    const getAUSer = async () => {
      let result = [];
      for (let i = 0; i < comments.length; i++) {
        let data = await getUser(comments[i].commented_by, loggedUser._id);
        result.push({
          commented_by: data,
          post: comments[i].post,
          created_at: comments[i].created_at,
          comment: comments[i].comment,
        });
      }
      return result;
    };
    const call = async () => {
      let res = await getAUSer();
      setFullComment(res);
    };
    call();
  }, [comments]);

  const extractDate = (str) => {
    let date = new Date(str);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let suffix = hour >= 12 ? "PM" : "AM";

    return (
      year + "-" + month + "-" + day + " " + hour + ":" + minute + " " + suffix
    );
  };

  return (
    <div className="comment-display-section">
      {fullComment
        ? fullComment.map((item, id) => (
            <div className="comment-display" key={id}>
              <div className="comment-heading">
                <div className="image-section">
                  <img
                    src={
                      item.commented_by.profileImage
                        ? `${url}/${item.commented_by.profileImage}`
                        : no_image
                    }
                    alt=""
                  />
                </div>
                <div className="info-section">
                  <div className="name">
                    <span>{item.commented_by.name} comments</span>
                  </div>
                  <div className="date">
                    <span>{extractDate(item.created_at)}</span>
                  </div>
                </div>
              </div>
              <hr />
              <div className="comment-body">{item.comment}</div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Comment;
