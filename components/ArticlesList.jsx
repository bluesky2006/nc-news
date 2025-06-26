import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArticles } from "../src/api";
import ArticleCard from "./ArticleCard";

function ArticlesList() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "created_at";

  useEffect(() => {
    setLoading(true);
    setError(false);
    setArticles(null);

    fetchArticles(sortBy)
      .then(({ articles }) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [sortBy]);

  if (loading) {
    return <p>Loading articles...</p>;
  }

  if (error) {
    return <p>Failed to load articles</p>;
  }

  if (!articles) {
    return null;
  }

  return (
    <section>
      <h2>Articles</h2>
      <div>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default ArticlesList;
