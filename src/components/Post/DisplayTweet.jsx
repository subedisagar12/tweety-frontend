import React from "react";
import Tweet from "./Tweet";
const DisplayTweet = ({ allTweets }) => {
  return (
    <section id="display_tweets">
      {allTweets
        ? allTweets.map((item, id) => <Tweet key={id} data={item} />)
        : null}
    </section>
  );
};

export default DisplayTweet;
