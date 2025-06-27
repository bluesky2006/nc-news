import { fetchTopics } from "../src/api";
import TopicBlock from "./TopicBlock";
import SortBlock from "./SortBlock";
import useApiRequest from "../utils";

function FilterBar({ articleListByTopicError }) {
  const { data: topics, loading, error } = useApiRequest(fetchTopics);

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
