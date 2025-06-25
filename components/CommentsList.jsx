import { fetchCommentsById } from "../src/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

function CommentsList() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let { article_id } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetchCommentsById(article_id)
      .then(({ comments }) => {
        setComments(comments);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [article_id]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Failed to load article</p>;
  }

  if (!comments) return null;

  return (
    <section>
      <Comment key={comments.comment_id} comments={comments} />
    </section>
  );
}

export default CommentsList;
