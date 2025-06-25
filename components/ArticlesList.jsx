import { useEffect, useState } from "react";
import { fetchArticles } from "../src/api";
import ArticleCard from "./ArticleCard";

function ArticlesList() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [startIndex, setStartIndex] = useState(0);
  // const [endIndex, setEndIndex] = useState(8);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setArticles(null);

    fetchArticles()
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loadin articles...</p>;
  }

  if (error) {
    return <p>Failed to load articles</p>;
  }

  if (!articles) return null;

  return (
    <section>
      <h2>Articles list</h2>
      <div>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </div>
    </section>
  );
}

export default ArticlesList;
