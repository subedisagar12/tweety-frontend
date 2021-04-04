import React, { useEffect, useState } from "react";
import PeopleList from "./PeopleList";
import { CircularProgress } from "@material-ui/core";

import "./People.css";
const PeopleYouMayKnow = ({ recommendedUsers, loggedUser, header }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!recommendedUsers) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [recommendedUsers]);

  return (
    <div className="people_you_may_know">
      <div className="recommendation-header">
        <h5 className="heading">{header}</h5>
      </div>
      <div className="recommended-users">
        {recommendedUsers ? (
          recommendedUsers.map((item, id) => (
            <PeopleList key={id} user={item} loggedUser={loggedUser} />
          ))
        ) : (
          <div className="progress">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
