import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function TopicBlock({ topics }) {
  const fullPath = useLocation();
  const pathParts = fullPath.pathname.split("/");
  const path = pathParts[pathParts.length - 1];

  return (
    <div className={"topic-section"}>
      <p>Browse articles by topic</p>
      <div className="topic-pill-section">
        {topics.map((topic) => {
          const { slug } = topic;
          return (
            <Link to={`/topics/${slug}`} key={slug}>
              <button
                className={`topic-button-outline${
                  slug === path ? " active" : ""
                }`}
              >
                {" "}
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
