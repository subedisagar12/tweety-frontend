import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import no_profile from "../../images/no_profile.png";
import { URLContext, LoggedInUserContext } from "../../API/URL";
import Comment from "./Comment";
import Alert from "@material-ui/lab/Alert";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import "./Post.css";
const Tweet = ({ data }) => {
  const initialState = {};
  const [loggedUser] = useContext(LoggedInUserContext);
  const [author, setAuthor] = useState(initialState);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(data.likes.length);
  const [url] = useContext(URLContext);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [displayEditOptions, setDisplayEditOptions] = useState(false);
  const [serverResponse, setServerResponse] = useState({
    success: "",
    error: "",
  });
  const [style, setStyle] = useState({
    display: "none",
  });

  const onClickToDisplayOption = () => {
    setDisplayEditOptions(!displayEditOptions);
  };

  const Like = () => {
    setLikes(likes + 1);
    setIsLiked(true);
    axios({
      method: "post",
      url: `${url}/post/like/${data._id}`,
      headers: { "auth-user-id": loggedUser._id },
    }).then((res) => console.log(res.data.data.likes));
  };

  const Unlike = () => {
    setLikes(likes - 1);
    setIsLiked(false);
    axios({
      method: "post",
      url: `${url}/post/like/${data._id}`,
      headers: { "auth-user-id": loggedUser._id },
    }).then((res) => console.log(res.data.data.likes));
  };

  const onClickToComment = () => {
    if (style.display === "none") {
      setStyle({
        ...style,
        display: "block",
      });
    } else {
      setStyle({
        ...style,
        display: "none",
      });
    }
  };

  const typeComment = (e) => {
    setComment(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (comment === "") {
      return;
    } else {
      axios({
        method: "post",
        url: `${url}/comment/${data._id}`,
        headers: { "auth-user-id": loggedUser._id },
        data: { comment: comment },
      })
        .then((res) => setAllComments([...allComments, res.data.data]))
        .catch((e) => console.log(e));
    }

    setComment("");
  };

  const deletePost = (post_id) => {
    setDisplayEditOptions(false);
    let wantToDelete = window.confirm("Do you want to delete this post?");
    if (wantToDelete === true) {
      axios({
        method: "post",
        url: `${url}/post/delete/${post_id}`,
        headers: { "auth-user-id": loggedUser._id },
      })
        .then((res) =>
          setServerResponse({
            ...serverResponse,
            success: res.data.success,
            error: res.data.error,
          })
        )
        .catch((e) =>
          setServerResponse({
            ...serverResponse,
            success: "",
            error: e.message,
          })
        );
    } else {
      return;
    }
  };

  useEffect(() => {
    if (data.likes.includes(loggedUser._id)) {
      setIsLiked(true);
    }
  }, []);
  useEffect(() => {
    axios({
      method: "get",
      url: `${url}/user/${data.author}`,
      headers: { "auth-user-id": loggedUser._id },
    }).then((res) => setAuthor(res.data.data));
  }, [data]);

  useEffect(() => {
    const fetchComments = async () => {
      await axios({
        method: "get",
        url: `${url}/comment/${data._id}`,
        headers: { "auth-user-id": loggedUser._id },
      })
        .then((res) => setAllComments(res.data.data))
        .catch((e) => console.log(e));
    };
    fetchComments();
  }, []);

  const imageUrl = url + "/" + author.profileImage;

  const getDate = (string) => {
    let newdate = new Date(string);
    let day = newdate.getDate();
    let month = newdate.getMonth();
    let year = newdate.getFullYear();
    return year + "-" + month + "-" + day;
  };
  const getTime = (string) => {
    let newdate = new Date(string);
    let hour = newdate.getHours();
    let unit = hour >= 12 ? "PM" : "AM";
    return hour + ":" + newdate.getMinutes() + " " + unit;
  };
  return (
    <>
      {serverResponse.error !== "" ? (
        <Alert severity="error" variant="outlined" className="error">
          {serverResponse.error}
        </Alert>
      ) : null}
      {serverResponse.success !== "" ? (
        <Alert severity="warning" variant="outlined" className="error">
          {serverResponse.success}
        </Alert>
      ) : null}
      <article className="tweet-container">
        {author._id === loggedUser._id ? (
          <div className="option-container">
            <span
              className="setting-button"
              onClick={(e) => onClickToDisplayOption()}
            >
              ...
            </span>
            {displayEditOptions == true ? (
              <div className="hidden-options">
                <ul className="list-group">
                  <li className="list-group-item hidden-menu">Edit</li>
                  <li
                    className="list-group-item hidden-menu"
                    onClick={() => deletePost(data._id)}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="info-section">
          <div className="profile_pic">
            <img
              src={author.profileImage === "" ? no_profile : `${imageUrl}`}
              alt=""
            />
          </div>
          <div className="name">
            <div className="author-name">{author.name}</div>
            <div className="date-time">
              {getDate(data.created_at)} {getTime(data.created_at)}
            </div>
          </div>
        </div>
        <hr />
        <div className="text-section">{data.tweet}</div>
        <hr />
        <div className="interaction-section">
          <div className="like">
            <div className="icon">
              {isLiked ? (
                <span
                  className="material-icons favorite"
                  onClick={(e) => Unlike()}
                >
                  favorite
                </span>
              ) : (
                <span className="material-icons" onClick={(e) => Like()}>
                  favorite_border
                </span>
              )}
            </div>
            <div className="text">
              {isLiked ? "Liked" : "Like"} ({likes})
            </div>
          </div>
          <div className="comment" onClick={(e) => onClickToComment()}>
            <SmsOutlinedIcon />
            <span>Comment ({allComments.length})</span>
          </div>
          <div className="retweet">
            <SendOutlinedIcon />
            <span>Retweet</span>
          </div>
        </div>
        <div className="comment-section" style={style}>
          <form>
            <div className="form-group">
              <textarea
                name="comment"
                id="comment"
                className="form-control"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => typeComment(e)}
              ></textarea>

              <button
                className="btn comment-button btn-sm mt-2 mb-3"
                onClick={(e) => submitComment(e)}
              >
                Comment
              </button>
              <Comment comments={allComments} />
            </div>
          </form>
        </div>
      </article>
    </>
  );
};

export default Tweet;
