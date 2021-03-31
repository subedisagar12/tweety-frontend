import React, { useEffect, useContext, useState } from "react";
import "./Follow.css";
import {
  getFollowers,
  LoggedInUserContext,
  URLContext,
  getUser,
} from "../../API/URL";
import { useParams } from "react-router-dom";

import { PeopleList } from "../ComponentsImport";
const Followers = () => {
  let params = useParams();
  const [loggedUser] = useContext(LoggedInUserContext);
  const [followers, setFollowers] = useState([]);
  const [url] = useContext(URLContext);
  const [userDetail, setUserDetail] = useState(null);
  useEffect(() => {
    const getAllFollowers = async () => {
      let data = await getFollowers(params.user_id, loggedUser._id);
      setFollowers(data);
    };
    getAllFollowers();
  }, []);

  useEffect(async () => {
    const getUserDetails = async () => {
      let result = [];
      for (let i = 0; i < followers.length; i++) {
        let data = await getUser(followers[i], loggedUser._id);
        result.push(data);
      }
      return result;
    };
    let info = await getUserDetails();
    setUserDetail(info);
  }, [followers]);

  return (
    <section className="followers-section">
      <div className="header">
        <h5 className="heading">Your followers</h5>
      </div>
      <div className="body">
        {userDetail ? (
          <div>
            {userDetail.map((item, id) => (
              <PeopleList user={item} key={id} />
            ))}
          </div>
        ) : (
          <h4>No followers</h4>
        )}
      </div>
    </section>
  );
};

export default Followers;
