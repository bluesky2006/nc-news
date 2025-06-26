import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTopics } from "../src/api";
import { useLocation } from "react-router-dom";

function FilterBar({ variant }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "created_at";

  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetchTopics()
      .then(({ topics }) => {
        setTopics(topics);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  function handleSortChange(event) {
    setSearchParams({ sort_by: event.target.value });
  }

  const sectionClass =
    variant === "sidebar"
      ? "topic-filter-sidebar desktop"
      : "topic-filter-topbar mobile";

  if (loading) {
    return <p>Loading topics...</p>;
  }

  if (error) {
    return <p>Failed to load topics</p>;
  }

  if (!topics) {
    return null;
  }

  return (
    <section className={sectionClass}>
      {pathname === "/" && (
        <div className="sort-section">
          <p>Sort by</p>
          <select onChange={handleSortChange} value={sortBy}>
            <option value="created_at">Date</option>
            <option value="title">Title</option>
            <option value="topic">Topic</option>
            <option value="author">User</option>
            <option value="votes">Votes</option>
          </select>
        </div>
      )}

      <p>Browse articles by topic</p>
      <div className={"topic-pill-section"}>
        {topics.map((topic) => {
          const buttonClass =
            pathname === `/topics/${topic.slug}`
              ? "topic-button-fill"
              : "topic-button-outline";
          return (
            <Link to={`/topics/${topic.slug}`} key={topic.slug}>
              <p className={buttonClass}>
                {topic.slug.replace(/\b\w/g, (letter) => letter.toUpperCase())}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default FilterBar;
