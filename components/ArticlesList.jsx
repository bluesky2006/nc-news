import { useEffect, useState } from "react";
import { fetchArticles } from "../src/api";
import ArticleCard from "./ArticleCard";

function ArticlesList() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);

  useEffect(() => {
    setLoading("Loading");
    setError(null);
    setArticles(null);

    fetchArticles(startIndex, endIndex)
      .then((articles) => {
        setArticles(articles);
        setLoading("");
      })
      .catch((err) => {
        setError(err.msg);
        setLoading("");
      });
  }, [startIndex, endIndex]);

  if (error) {
    return (
      <section>
        <p>No articles</p>
      </section>
    );
  }

  if (!articles) {
    return (
      <section>
        <p>{loading}</p>
      </section>
    );
  }

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
