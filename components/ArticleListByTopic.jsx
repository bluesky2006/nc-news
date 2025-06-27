import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../src/api";
import { useParams, useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import FilterBar from "./FilterBar";

function ArticleListByTopic() {
  const { topic } = useParams();
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

    fetchArticlesByTopic(topic, sortBy, order)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.status);
        setLoading(false);
      });
  }, [topic, sortBy, order]);

  return loading ? (
    <p>Loading articles...</p>
  ) : error === 404 ? (
    <section>
      <FilterBar articleListByTopicError={error} />
      <p>
        That topic does not exist – try picking an existing one from the
        selection above.
      </p>
    </section>
  ) : !articles ? null : (
    <section>
      <FilterBar />
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
