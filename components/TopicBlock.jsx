import { Link } from "react-router-dom";

function TopicBlock({ topics }) {
  return (
    <div className={"topic-section"}>
      <p>Browse articles by topic</p>
      <div className="topic-pill-section">
        {topics.map((topic) => {
          const { slug } = topic;
          return (
            <Link to={`/topics/${slug}`} key={slug}>
              <button className="topic-button-outline">
                {slug.replace(/\b\w/g, (letter) => letter.toUpperCase())}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TopicBlock;
