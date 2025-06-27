import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTopics } from "../src/api";

function FilterBar() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

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
    setSearchParams({ sort_by: event.target.value, order });
  }

  function handleOrder() {
    const newOrder = order === "desc" ? "asc" : "desc";
    setSearchParams({ sort_by: sortBy, order: newOrder });
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
            return (
              <Link to={`/topics/${topic.slug}`} key={topic.slug}>
                <button className="topic-button-outline">
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
          <div className="drop-down-container">
            <div className="drop-down">
              <label htmlFor="sort-by-select">Sort by</label>
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
            <div className="sort-div">
              <p>{order.charAt(0).toUpperCase() + order.slice(1)}</p>
              <div
                className="sort-arrow-span material-symbols-outlined"
                onClick={handleOrder}
                title={`Toggle order (currently ${order})`}
              >
                swap_vert
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FilterBar;
