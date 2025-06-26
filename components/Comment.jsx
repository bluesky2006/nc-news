import { convertDate } from "../utils";
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
    deleteCommentById(comment_id).then(() => {
      setDeleted(`Your comment (${comment_id}) was deleted.`);
      setComments((currComments) =>
        currComments.filter((comment) => comment.comment_id !== comment_id)
      );
    });
  }

  return (
    <section>
      {deleted && <p className="delete-message">{deleted}</p>}
      {comments.map((comment, index) => {
        return (
          <section key={index} className="card">
            <p className="comment-body">{comment.body}</p>
            <div className="metadata">
              <p className="pill">
                <strong>Author:</strong> {comment.author}
              </p>
              <p className="pill">
                <strong>Date posted:</strong> {convertDate(comment.created_at)}
              </p>
              <p className="pill">
                <strong>Votes:</strong> {comment.votes}
              </p>
            </div>
            {loggedInUser.name === comment.author && (
              <div className="delete-div">
                <button onClick={() => handleDelete(comment.comment_id)}>
                  Delete comment
                </button>
              </div>
            )}
          </section>
        );
      })}
    </section>
  );
}

export default Comment;
