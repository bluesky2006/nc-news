import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTopics } from "../src/api";
import { useLocation } from "react-router-dom";

function FilterBar() {
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
    <section className="filter">
      <div className={"topic-section"}>
        <p>Browse articles by topic</p>
        <div className="topic-pill-section">
          {topics.map((topic) => {
            const buttonClass =
              pathname === `/topics/${topic.slug}`
                ? "topic-button-fill"
                : "topic-button-outline";
            return (
              <Link to={`/topics/${topic.slug}`} key={topic.slug}>
                <button className={buttonClass}>
                  {topic.slug.replace(/\b\w/g, (letter) =>
                    letter.toUpperCase()
                  )}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
      {pathname === "/" && (
        <div className="sort-section">
          <label for="sort-by-select">Sort by</label>

          <select
            id="sort-by-select"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value="created_at">Date</option>
            <option value="title">Title</option>
            <option value="topic">Topic</option>
            <option value="author">User</option>
            <option value="votes">Votes</option>
          </select>
        </div>
      )}
    </section>
  );
}

export default FilterBar;
