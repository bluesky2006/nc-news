import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArticles } from "../src/api";
import ArticleCard from "./ArticleCard";
import FilterBar from "./FilterBar";

function ArticlesList() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setLoading(true);
    setError("");
    setArticles(null);

    fetchArticles(sortBy, order)
      .then(({ articles }) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.msg);
        setLoading(false);
      });
  }, [sortBy, order]);

  return loading ? (
    <p>Loading articles...</p>
  ) : error ? (
    <p>{error}</p>
  ) : !articles ? null : (
    <section>
      <FilterBar />
      <div>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default ArticlesList;
