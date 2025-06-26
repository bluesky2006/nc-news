import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../src/api";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

function ArticleListByTopic() {
  const { topic } = useParams();
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setArticles(null);

    fetchArticlesByTopic(topic)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [topic]);

  if (loading) {
    return <p>Loading articles...</p>;
  }

  if (error) {
    return <p>Failed to load articles</p>;
  }

  if (!articles) return null;

  return (
    <section>
      <h2>
        {topic.replace(/\b\w/g, (firstLetter) => firstLetter.toUpperCase())}{" "}
        articles
      </h2>
      <div>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </div>
    </section>
  );
}

export default ArticleListByTopic;
