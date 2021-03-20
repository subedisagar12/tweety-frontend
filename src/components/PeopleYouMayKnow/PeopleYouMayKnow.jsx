import React from "react";
import PeopleList from "./PeopleList";
import "./People.css";
const PeopleYouMayKnow = ({ recommendedUsers, loggedUser }) => {
  return (
    <section id="people_you_may_know">
      <div className="recommendation-header">
        <h5 className="heading">You may know them</h5>
      </div>
      <div className="recommended-users">
        {recommendedUsers
          ? recommendedUsers.map((item, id) => (
              <PeopleList key={id} user={item} loggedUser={loggedUser} />
            ))
          : null}
      </div>
    </section>
  );
};

export default PeopleYouMayKnow;
