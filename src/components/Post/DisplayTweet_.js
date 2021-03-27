import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import Tweet from "./Tweet";
import {
  GetAllPostsOfFollowedPeople,
  LoggedInUserContext,
} from "../../API/URL";

const DisplayTweet = () => {
  const [posts, setPost] = useState([]);
  const [loggedUser] = useContext(LoggedInUserContext);

  useEffect(() => {
    const getPost = async () => {
      let res = await GetAllPostsOfFollowedPeople(loggedUser);
      // console.log(res);
      setPost(res);
    };
    getPost();
  }, []);

  // console.log(posts);
  return (
    <section id="display_tweets">
      {posts ? posts.map((item, id) => <Tweet key={id} data={item} />) : null}
    </section>
  );
};

export default DisplayTweet;
