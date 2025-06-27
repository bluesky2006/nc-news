import { fetchCommentsById } from "../src/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function CommentsList() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let { article_id } = useParams();

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchCommentsById(article_id)
      .then(({ comments }) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.status);
        setLoading(false);
      });
  }, [article_id]);

  return loading ? (
    <p>Loading comments...</p>
  ) : error === 404 ? (
    <p>No comments exist for that article.</p>
  ) : (
    <section>
      <CommentForm
        article_id={article_id}
        setComments={setComments}
        comments={comments}
      />
      <h2>Comments</h2>
      <Comment setComments={setComments} comments={comments} />
    </section>
  );
}

export default CommentsList;
