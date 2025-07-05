import { convertDateWithTime } from "../utils";
import { deleteCommentById } from "../src/api";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function Comment({ comments, setComments }) {
  const [deleted, setDeleted] = useState(null);
  const { loggedInUser } = useContext(UserContext);

  if (!comments) {
    return null;
  }

  function handleDelete(comment_id) {
    deleteCommentById(comment_id)
      .then(() => {
        setDeleted(`Your comment (${comment_id}) was deleted.`);
        setComments((currComments) =>
          currComments.filter((comment) => comment.comment_id !== comment_id)
        );
      })
      .catch(() => {
        setDeleted(`Failed to delete your comment (${comment_id}).`);
      });
  }

  return (
    <section>
      {deleted && <p className="delete-message">{deleted}</p>}
      {comments.map((comment, index) => {
        const { body, author, created_at, votes, comment_id } = comment;
        return (
          <section key={index} className="card">
            <p>{body}</p>
            <div className="metadata">
              <div className="pill-div">
                <p className="pill">Posted by {author}</p>
                <p className="pill">{convertDateWithTime(created_at)}</p>
                <p className="pill">{votes} votes</p>
              </div>
              {loggedInUser.name === author && (
                <div className="delete-div">
                  <button onClick={() => handleDelete(comment_id)}>
                    Delete comment
                  </button>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </section>
  );
}

export default Comment;
