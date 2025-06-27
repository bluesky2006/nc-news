import { useEffect, useState } from "react";
import { fetchTopics } from "../src/api";
import TopicBlock from "./TopicBlock";
import SortBlock from "./SortBlock";

function FilterBar({ articleListByTopicError }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchTopics()
      .then(({ topics }) => {
        setTopics(topics);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.msg);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <p>Loading topics...</p>
  ) : error ? (
    <p>{error}</p>
  ) : !topics ? null : (
    <section className="filter">
      <TopicBlock topics={topics} />
      {articleListByTopicError ? null : <SortBlock />}
    </section>
  );
}

export default FilterBar;
