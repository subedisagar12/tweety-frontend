import React from "react";
import { DisplayTweet } from "../../ComponentsImport";
import "./UserDashboard.css";
const UserPost = ({ userPost }) => {
  return <DisplayTweet allTweets={userPost} />;
};

export default UserPost;
