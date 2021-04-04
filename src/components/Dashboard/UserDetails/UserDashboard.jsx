import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./UserDashboard.css";
import {
  URLContext,
  LoggedInUserContext,
  getAllPostOfUser,
  getMutualFollowers,
  getMutualFollowing,
  getUser,
} from "../../../API/URL";
import UserProfile from "./UserProfile";
import UserPost from "./UserPost";
import { PeopleYouMayKnow } from "../../ComponentsImport";
const UserDashboard = () => {
  let history = useHistory();
  let params = useParams();
  const [user, setUser] = useState(null);
  const [userPost, setUserPost] = useState(null);
  const [mutualFollowersID, setMutualFollowersID] = useState(null);
  const [mutualFollowers, setMutualFollowers] = useState(null);
  const [mutualFollowingID, setMutualFollowingID] = useState(null);
  const [mutualFollowing, setMutualFollowing] = useState(null);
  const [url] = useContext(URLContext);
  const [loggedUser] = useContext(LoggedInUserContext);
  const getUserInfo = () => {
    if (loggedUser) {
      axios({
        method: "get",
        url: `${url}/user/${params.user_id}`,
        headers: { "auth-user-id": loggedUser._id },
      })
        .then((res) => setUser(res.data.data))
        .catch((e) => console.log(e.message));
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [loggedUser, params.user_id]);

  useEffect(() => {
    const getData = async () => {
      let data = await getAllPostOfUser(params.user_id, loggedUser._id);
      setUserPost(data);
    };
    if (loggedUser) {
      getData();
    } else {
      return null;
    }
  }, [loggedUser, params.user_id]);

  useEffect(() => {
    const getFollowers = async () => {
      let data = await getMutualFollowers(loggedUser._id, params.user_id);

      setMutualFollowersID(data);
    };
    if (loggedUser) {
      getFollowers();
    }
  }, [loggedUser, params.user_id]);

  useEffect(() => {
    const getAUser = async () => {
      let result = [];
      for (let i = 0; i < mutualFollowersID.length; i++) {
        let data = await getUser(mutualFollowersID[i], loggedUser._id);
        result.push(data);
      }
      return result;
    };

    const call = async () => {
      if (loggedUser && mutualFollowersID) {
        let res = await getAUser();
        setMutualFollowers(res);
      }
    };
    call();
  }, [mutualFollowersID]);

  // Mutual following
  useEffect(() => {
    const getFollowing = async () => {
      let data = await getMutualFollowing(loggedUser._id, params.user_id);

      setMutualFollowingID(data);
    };
    if (loggedUser) {
      getFollowing();
    }
  }, [loggedUser, params.user_id]);

  useEffect(() => {
    const getAUser = async () => {
      let result = [];
      for (let i = 0; i < mutualFollowingID.length; i++) {
        let data = await getUser(mutualFollowingID[i], loggedUser._id);
        result.push(data);
      }
      return result;
    };

    const call = async () => {
      if (loggedUser && mutualFollowingID) {
        let res = await getAUser();
        setMutualFollowing(res);
      }
    };
    call();
  }, [mutualFollowingID]);

  return (
    <section id="user-dashboard">
      <div className="row">
        <div className="col-md-3 user-profile">
          <UserProfile user={user} />
        </div>
        <div className="col-md-6 user-posts">
          <UserPost userPost={userPost} />
        </div>
        <div className="col-md-3 user-info">
          {/* Mutual Follower section goes here */}
          <PeopleYouMayKnow
            header={`Mutual Follower (${mutualFollowers.length})`}
            recommendedUsers={mutualFollowers}
          />

          <PeopleYouMayKnow
            header={`You Both follow them (${mutualFollowing.length})`}
            recommendedUsers={mutualFollowing}
          />
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
