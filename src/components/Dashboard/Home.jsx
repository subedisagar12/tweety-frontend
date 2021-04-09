import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";
import "./Dashboard.css";
import {
  CreateTweet,
  ProfileDisplay,
  PeopleYouMayKnow,
  DisplayTweet,
  Followers,
  Following,
} from "../ComponentsImport";
import { URLContext } from "../../API/URL";
const HomePage = ({ loggedUser }) => {
  const [allUser, setAllUser] = useState(null);

  let [url] = useContext(URLContext);

  // Create tweet functions
  const [allTweets, setAllTweets] = useState([]);
  const [tweet, setTweet] = useState("");
  const [words, setWords] = useState(0);
  const [serverReport, setServerReport] = useState({
    data: {},
    error: "",
    success: "",
  });

  const GetAllPostsOfFollowedPeople = async () => {
    axios({
      method: "get",
      url: `${url}/post/allPost/${loggedUser._id}`,
      headers: { "auth-user-id": loggedUser._id },
    }).then((res) => setAllTweets(res.data.data));
  };

  useEffect(() => {
    GetAllPostsOfFollowedPeople();
  }, [serverReport]);
  const wordCounter = () => {
    setWords(tweet.length);
  };

  const BindChange = async (e) => {
    setTweet(e.target.value);
  };

  useEffect(() => {
    wordCounter();
  }, [tweet]);

  const PostTweet = async (e) => {
    e.preventDefault();
    let temp_tweet = tweet.split(" ").join("");
    if (temp_tweet === "") {
      return;
    }
    await axios({
      method: "post",
      url: `${url}/post`,
      headers: { "auth-user-id": loggedUser._id },
      data: { tweet: tweet },
    })
      .then((res) =>
        setServerReport({
          data: res.data.data,
          error: res.data.error,
          success: res.data.success,
        })
      )

      .catch((e) => setServerReport({ ...serverReport, error: e.message }));
  };

  // console.log(serverReport);
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     let res = await GetAllPostsOfFollowedPeople(loggedUser);

  //     return res;
  //   };
  //   const call = async () => {
  //     let data = await fetchPost();
  //     setAllTweets(data);
  //   };

  //   call();
  // }, []);

  useEffect(() => {
    if (serverReport.success !== "") {
      setTweet("");
    }
  }, [serverReport.success]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      let users = null;
      await axios({
        method: "get",
        headers: { "auth-user-id": loggedUser._id },
        url: `${url}/user/all`,
      })
        .then((res) => {
          users = res.data.data;
        })
        .catch((e) => console.log(e.message));

      let filtered_user = await users.filter(
        (item) => item._id !== loggedUser._id
      );
      let unfollowedUser = await filtered_user.filter(
        (item) => !loggedUser.following.includes(item._id)
      );
      // setAllUser(filtered_user);
      setAllUser(unfollowedUser);
    };
    fetchAllUsers();
  }, [loggedUser]);

  return (
    <section id="home" className="row">
      <div className="profile col-md-3">
        <ProfileDisplay loggedUser={loggedUser} />
      </div>
      <div className="tweets col-md-6">
        <Switch>
          <Route path="/" exact>
            <CreateTweet
              loggedUser={loggedUser}
              tweet={tweet}
              setTweet={setTweet}
              words={words}
              setWords={setWords}
              wordCounter={wordCounter}
              BindChange={BindChange}
              PostTweet={PostTweet}
              serverReport={serverReport}
            />
            <DisplayTweet allTweets={allTweets} />
          </Route>
          <Route path="/:user_id/followers" exact>
            <Followers />
          </Route>
          <Route path="/:user_id/following" exact>
            <Following />
          </Route>
        </Switch>
      </div>
      <div className="activities col-md-3">
        <div className="recommendation">
          <PeopleYouMayKnow
            recommendedUsers={allUser}
            loggedUser={loggedUser}
            header="People you may know"
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
