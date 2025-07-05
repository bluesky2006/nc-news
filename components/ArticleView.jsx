import { useParams } from "react-router-dom";
import { fetchArticleById } from "../src/api";
import useApiRequest from "../utils";
import ArticleDetail from "./ArticleDetail";
import CommentsList from "./CommentsList";
import ErrorScreen from "./ErrorScreen";

function ArticleView() {
  const { article_id } = useParams();

  const {
    data: article,
    loading: loading,
    error: error,
  } = useApiRequest(fetchArticleById, article_id);

  if (loading) return <p>Loading article...</p>;

  if (error) {
    return <ErrorScreen />;
  }

  if (!article) return null;

  return (
    <section>
      <ArticleDetail article={article} />
      <CommentsList article_id={article_id} />
    </section>
  );
}

export default ArticleView;
