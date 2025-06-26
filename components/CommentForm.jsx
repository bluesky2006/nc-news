import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { postCommentById } from "../src/api";

function CommentForm({ article_id, setComments, comments }) {
  const [input, setInput] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setPosting(true);
    setError(false);

    const body = {
      username: loggedInUser.name,
      body: input,
    };

    postCommentById(article_id, body)
      .then((response) => {
        setComments([response.comment, ...comments]);
        setInput("");
        setPosting(false);
      })
      .catch(() => {
        setError(true);
        setPosting(false);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <label htmlFor="add-comment">
        <strong>New comment</strong>
      </label>
      <div className="input-and-button-div">
        <input
          id="add-comment"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Write your comment in here..."
          required
        />
        <button type="submit" disabled={posting}>
          {posting ? "Posting..." : "Post"}
        </button>
      </div>
      {error && <p>Failed to post comment</p>}
    </form>
  );
}

export default CommentForm;
