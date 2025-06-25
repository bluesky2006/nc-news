import { convertDate } from "../utils";

function Comment({ comments }) {
  return (
    <section>
      {comments.map((comment) => {
        return (
          <section key={comment.comment_id} className="comment">
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
