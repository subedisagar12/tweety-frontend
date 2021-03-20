import React, { useContext, useState } from "react";
import { URLContext } from "../../API/URL";
import axios from "axios";
const CreateTweet = ({ loggedUser }) => {
  const [tweet, setTweet] = useState("");
  const [serverReport, setServerReport] = useState({
    data: {},
    error: "",
    success: "",
  });

  const [url] = useContext(URLContext);
  const BindChange = (e) => {
    setTweet(e.target.value);
  };

  const PostTweet = (e) => {
    e.preventDefault();
    let temp_tweet = tweet.split(" ").join("");
    if (temp_tweet === "") {
      return;
    }
    axios({
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
      .then(setTweet(""))
      .catch((e) => setServerReport({ ...serverReport, error: e.message }));
  };
  return (
    <section id="create_tweet">
      {serverReport.error !== "" ? (
        <div className="alert alert-danger">{serverReport.error}</div>
      ) : null}
      {serverReport.success !== "" ? (
        <div className="alert alert-success">{serverReport.success}</div>
      ) : null}
      <form>
        <textarea
          rows="3"
          placeholder={`What's on your mind, ${loggedUser.name}?`}
          name="tweet"
          id="tweet"
          value={tweet}
          className="form-control"
          onChange={(e) => BindChange(e)}
        ></textarea>
        <input
          type="submit"
          value="Tweet"
          name="tweet"
          onClick={(e) => PostTweet(e)}
        />
      </form>
    </section>
  );
};

export default CreateTweet;
