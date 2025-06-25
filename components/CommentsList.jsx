import { fetchCommentsById } from "../src/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

function CommentsList() {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);

  let { article_id } = useParams();

  useEffect(() => {
    setLoading("Loading");
    setError(null);
    setComments(null);

    fetchCommentsById(article_id)
      .then(({ comments }) => {
        setComments(comments);
        setLoading("");
        console.log(comments, "<< comments in Comments");
      })
      .catch((err) => {
        console.log(err, "<< error in Comments>>");
        setError(err.msg);
        setLoading("");
      });
  }, [article_id]);

  if (error) {
    return (
      <section>
        <p>No comments</p>
      </section>
    );
  }

  if (!comments) {
    return (
      <section>
        <p>{loading}</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Comments</h2>
      <Comment key={comments.comment_id} comments={comments} />
    </section>
  );
}

export default CommentsList;
