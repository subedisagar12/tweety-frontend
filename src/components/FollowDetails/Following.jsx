import React, { useEffect, useContext, useState } from "react";
import { CircularProgress } from "@material-ui/core";
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
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [filteredUser, setFilteredUser] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setFilteredUser(userDetail);
  }, [userDetail]);
  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    if (query === "") {
      setFilteredUser(userDetail);
    } else {
      let results = userDetail.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUser(results);
    }
  }, [query]);
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
      setLoading(true);
      for (let i = 0; i < following.length; i++) {
        let data = await getUser(following[i], loggedUser._id);
        result.push(data);
      }
      return result;
    };
    let info = await getUserDetails();
    setUserDetail(info);
    setLoading(false);
  }, [following]);

  return (
    <section className="followers-section">
      <div className="header">
        <h5 className="heading">Your followings</h5>
      </div>
      {loading ? (
        <div className="loading-section">
          <CircularProgress />
        </div>
      ) : (
        <div className="body">
          <div className="search-box mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={query}
              onChange={(e) => onQueryChange(e)}
            />
          </div>
          {filteredUser ? (
            <div>
              {filteredUser.map((item, id) => (
                <PeopleList user={item} key={id} />
              ))}
            </div>
          ) : (
            <h4>You don't follow anyone</h4>
          )}
        </div>
      )}
    </section>
  );
};

export default Following;
