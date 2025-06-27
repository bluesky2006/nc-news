import { Link } from "react-router-dom";
import { convertDate } from "../utils";

function ArticleCard({ article }) {
  const {
    article_id,
    article_img_url,
    title,
    author,
    topic,
    created_at,
    votes,
  } = article;

  return (
    <div key={article_id} className="card">
      <div className="article-card-header">
        <img
          src={article_img_url}
          alt="Article image"
          className="article-card-image"
        />
        <div className="article-card-content">
          <Link to={`/articles/${article_id}`}>
            <h3>{title}</h3>
          </Link>
          <div className="metadata">
            <p className="pill">
              <strong>Author:</strong> {author}
            </p>
            <p className="pill">
              <strong>Topic:</strong> {topic}
            </p>
            <p className="pill">
              <strong>Date:</strong> {convertDate(created_at)}
            </p>
            <p className="pill">
              <strong>Votes:</strong> {votes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
