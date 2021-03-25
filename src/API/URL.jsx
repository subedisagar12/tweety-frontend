import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

export const URLContext = createContext();
export const LoggedInUserContext = createContext();
export const PostContext = createContext();
export const URLProvider = (props) => {
  const url = "http://localhost:5000";
  return (
    <URLContext.Provider value={[url]}>{props.children}</URLContext.Provider>
  );
};

export const LoggedInUserProvider = (props) => {
  const [loggedUser, setLoggedUser] = useState(null);
  return (
    <LoggedInUserContext.Provider value={[loggedUser, setLoggedUser]}>
      {props.children}
    </LoggedInUserContext.Provider>
  );
};

export const Follow = async (to_be_followed, loggedUser, setLoggedUser) => {
  setLoggedUser({
    ...loggedUser,
    following: [...loggedUser.following, to_be_followed],
  });

  axios({
    method: "post",
    url: `http://localhost:5000/user/follow/${to_be_followed}`,
    headers: { "auth-user-id": loggedUser._id },
  })
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
};

export const UnFollow = async (to_be_unfollowed, loggedUser, setLoggedUser) => {
  let items = loggedUser.following.filter((item) => item !== to_be_unfollowed);

  setLoggedUser({
    ...loggedUser,
    following: items,
  });

  axios({
    method: "post",
    url: `http://localhost:5000/user/unfollow/${to_be_unfollowed}`,
    headers: { "auth-user-id": loggedUser._id },
  })
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
};

export const sortByDate = (arr) => {
  const sorter = (a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  };
  arr.sort(sorter);
};

export const GetAllPostsOfFollowedPeople = async (user) => {
  if (user) {
    let res = null;
    let filtered_res = [];

    await axios({
      url: "http://localhost:5000/post",
      method: "get",
      headers: { "auth-user-id": user._id },
    }).then((data) => {
      res = data.data.data;
    });

    res.forEach((element) => {
      if (
        user.following.includes(element.author) ||
        element.author === user._id
      ) {
        filtered_res.push(element);
      }
    });

    sortByDate(filtered_res);
    return filtered_res;
  }
};

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {props.children}
    </PostContext.Provider>
  );
};
