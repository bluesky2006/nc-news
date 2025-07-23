import { convertDateWithTime } from "../utils";
import { deleteCommentById } from "../src/api";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";

function Comment({
  comments,
  setComments,
  deleted,
  setDeleted,
  setCommentCount,
}) {
  const { loggedInUser } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (deleted) {
      const timeout = setTimeout(() => {
        setDeleted(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [deleted, setDeleted]);

  if (!comments) {
    return null;
  }

  function handleDelete(comment_id) {
    setIsDisabled(true);
    deleteCommentById(comment_id)
      .then(() => {
        setDeleted(`Your comment (${comment_id}) was deleted.`);
        setComments((currComments) =>
          currComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setCommentCount((prev) => prev - 1);
        setIsDisabled(false);
      })
      .catch(() => {
        setDeleted(`Failed to delete your comment (${comment_id}).`);
      });
  }

  return (
    <section>
      {deleted && (
        <div className="delete-container">
          <p className="delete-msg">{deleted}</p>
        </div>
      )}
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
                  <button
                    onClick={() => handleDelete(comment_id)}
                    disabled={isDisabled}
                  >
                    {!isDisabled ? "Delete comment" : "Deleting..."}
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
