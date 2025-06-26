import { fetchTopics } from "../src/api";
import { useState, useEffect } from "react";

function Sidebar() {
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

  if (!topics) return null;

  console.log(topics);

  return (
    <section className="topic-filter-sidebar desktop">
      <h2>Articles by topic</h2>
      <div className="topic-pill-section">
        {topics.map((topic) => {
          return (
            <p className="topic-pill" key={topic.slug}>
              {topic.slug.replace(/\b\w/g, (firstLetter) =>
                firstLetter.toUpperCase()
              )}
            </p>
          );
        })}
      </div>
    </section>
  );
}

export default Sidebar;
