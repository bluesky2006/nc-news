import { convertDate } from "../utils";

function Comment({ comments }) {
  if (!comments) {
    return null;
  }
  console.log(comments[0], "what the object should look like");
  return (
    <section>
      {comments.map((comment, index) => {
        return (
          <section key={index} className="comment">
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
          </section>
        );
      })}
    </section>
  );
}

export default Comment;
