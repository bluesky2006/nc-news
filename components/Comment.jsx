import { convertDate } from "../utils";

function Comment({ comments }) {
  return (
    <section>
      {comments.map((comment) => {
        return (
          <section key={comment.comment_id} className="comment">
            <p>{comment.body}</p>
            <p className="pill">Author: {comment.author}</p>
            <p className="pill">Date: {convertDate(comment.created_at)}</p>
            <p className="pill">Votes: {comment.votes}</p>
          </section>
        );
      })}
    </section>
  );
}

export default Comment;
