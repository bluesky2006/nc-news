import { Link } from "react-router-dom";
import { fetchTopics } from "../src/api";
import { useState, useEffect } from "react";

function TopicMenu({ variant }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  if (loading) {
    return <p>Loading topics...</p>;
  }

  if (error) {
    return <p>Failed to load topics</p>;
  }

  if (!topics || topics.length === 0) {
    return null;
  }

  const sectionClass =
    variant === "sidebar"
      ? "topic-filter-sidebar desktop"
      : "topic-filter-topbar mobile";

  return (
    <section className={sectionClass}>
      <p>Browse articles by topic</p>
      <div className="topic-pill-section">
        {topics.map((topic) => (
          <Link to={`/topics/${topic.slug}`} key={topic.slug}>
            <p className="topic-pill">
              {topic.slug.replace(/\b\w/g, (firstLetter) =>
                firstLetter.toUpperCase()
              )}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TopicMenu;
