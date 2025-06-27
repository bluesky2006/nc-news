import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../src/api";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

function ArticleListByTopic() {
  const { topic } = useParams();
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setArticles(null);

    fetchArticlesByTopic(topic)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.msg);
        setLoading(false);
      });
  }, [topic]);

  return loading ? (
    <p>Loading articles...</p>
  ) : error ? (
    <p>{error}</p>
  ) : !articles ? null : (
    <section>
      <h2>
        {topic.replace(/\b\w/g, (letter) => letter.toUpperCase())} articles
      </h2>
      <div>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </section>
  );
}
export default ArticleListByTopic;
