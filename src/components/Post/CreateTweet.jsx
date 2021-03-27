import React, { useContext, useEffect, useState } from "react";
import { GetAllPostsOfFollowedPeople, URLContext } from "../../API/URL";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
const CreateTweet = ({
  loggedUser,
  tweet,
  words,
  BindChange,
  PostTweet,
  serverReport,
}) => {
  // const [tweet, setTweet] = useState("");
  // const [words, setWords] = useState(0);
  // const [serverReport, setServerReport] = useState({
  //   data: {},
  //   error: "",
  //   success: "",
  // });

  // const [url] = useContext(URLContext);
  // const wordCounter = () => {
  //   setWords(tweet.length);
  // };

  // const BindChange = async (e) => {
  //   setTweet(e.target.value);
  // };

  // useEffect(() => {
  //   wordCounter();
  // }, [tweet]);

  // const PostTweet = async (e) => {
  //   e.preventDefault();
  //   let temp_tweet = tweet.split(" ").join("");
  //   if (temp_tweet === "") {
  //     return;
  //   }
  //   await axios({
  //     method: "post",
  //     url: `${url}/post`,
  //     headers: { "auth-user-id": loggedUser._id },
  //     data: { tweet: tweet },
  //   })
  //     .then((res) =>
  //       setServerReport({
  //         data: res.data.data,
  //         error: res.data.error,
  //         success: res.data.success,
  //       })
  //     )

  //     .catch((e) => setServerReport({ ...serverReport, error: e.message }));
  // };

  // useEffect(() => {
  //   if (serverReport.success !== "") {
  //     setTweet("");
  //   }
  // }, [serverReport.success]);
  return (
    <section id="create_tweet">
      {serverReport.error !== "" ? (
        <Alert severity="error" variant="outlined" className="alert">
          {serverReport.error}
        </Alert>
      ) : null}
      {serverReport.success !== "" ? (
        <Alert severity="success" variant="outlined" className="alert">
          {serverReport.success}
        </Alert>
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
        <div>
          <span className="word-counter">{words}/500</span>
        </div>
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
