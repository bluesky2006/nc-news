import { useState } from "react";
import { useParams } from "react-router-dom";
import { postCommentById } from "../src/api";
import Comment from "./Comment";

function CommentForm() {
  const [input, setInput] = useState("");
  const [comment, setComment] = useState(null);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(false);

  let { article_id } = useParams();

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  // 3. function to handle comment submission

  function handleSubmit(event) {
    event.preventDefault();
    setPosting(true);
    setError(false);

    setComment({
      comment: {
        body: input,
        votes: 0,
        author: "grumpy19",
        created_at: new Date().toISOString(),
        comment_id: Date.now(),
      },
    });

    const body = {
      username: "grumpy19",
      body: input,
    };

    postCommentById(article_id, body)
      .then((comment) => {
        setComment(comment);
        setPosting(false);
        setInput("");
      })
      .catch(() => {
        setError(true);
        setPosting(false);
      });
  }

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="add-comment">New comment</label>
          <div>
            <input
              id="add-comment"
              type="text"
              value={input}
              onChange={handleInputChange}
            />
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
      {posting && <p>Posting...</p>}
      {error && <p>Failed to post comment</p>}
      {comment && <Comment key={comment.comment_id} comments={[comment]} />}
    </section>
  );
}

export default CommentForm;
