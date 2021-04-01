import React from "react";
import PeopleList from "./PeopleList";
import "./People.css";
const PeopleYouMayKnow = ({ recommendedUsers, loggedUser }) => {
  return (
    <div id="people_you_may_know">
      <div className="recommendation-header">
        <h5 className="heading">People you may know</h5>
      </div>
      <div className="recommended-users">
        {recommendedUsers
          ? recommendedUsers.map((item, id) => (
              <PeopleList key={id} user={item} loggedUser={loggedUser} />
            ))
          : null}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
