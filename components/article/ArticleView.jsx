import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../../src/api";
import ArticleDetail from "./ArticleDetail";
import CommentsList from "../comment/CommentsList";
import ErrorScreen from "../ErrorScreen";

function ArticleView() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setCommentCount(data.comment_count);
        setError("");
      })
      .catch((err) => {
        setError(err.msg || "Unknown error");
      })
      .finally(() => setLoading(false));
  }, [article_id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <ErrorScreen />;
  if (!article) return null;

  return (
    <section>
      <ArticleDetail article={article} commentCount={commentCount} />
      <CommentsList article_id={article_id} setCommentCount={setCommentCount} />
    </section>
  );
}

export default ArticleView;
