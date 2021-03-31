import React, { useEffect, useContext, useState } from "react";
import "./Follow.css";
import {
  getFollowing,
  LoggedInUserContext,
  URLContext,
  getUser,
} from "../../API/URL";
import { useParams } from "react-router-dom";

import { PeopleList } from "../ComponentsImport";
const Following = () => {
  let params = useParams();
  const [loggedUser] = useContext(LoggedInUserContext);
  const [following, setFollowing] = useState([]);
  const [url] = useContext(URLContext);
  const [userDetail, setUserDetail] = useState(null);
  useEffect(() => {
    const getAllFollowing = async () => {
      let data = await getFollowing(params.user_id, loggedUser._id);
      setFollowing(data);
    };
    getAllFollowing();
  }, []);

  useEffect(async () => {
    const getUserDetails = async () => {
      let result = [];
      for (let i = 0; i < following.length; i++) {
        let data = await getUser(following[i], loggedUser._id);
        result.push(data);
      }
      return result;
    };
    let info = await getUserDetails();
    setUserDetail(info);
  }, [following]);

  return (
    <section className="followers-section">
      <div className="header">
        <h5 className="heading">Your followings</h5>
      </div>
      <div className="body">
        {userDetail ? (
          <div>
            {userDetail.map((item, id) => (
              <PeopleList user={item} key={id} />
            ))}
          </div>
        ) : (
          <h4>You don't follow anyone</h4>
        )}
      </div>
    </section>
  );
};

export default Following;
