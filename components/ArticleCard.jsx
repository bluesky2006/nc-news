import { Link } from "react-router-dom";
import { convertDate } from "../utils";

function ArticleCard({ article }) {
  return (
    <div key={article.article_id} className="card">
      <div className="article-card-header">
        <img
          src={article.article_img_url}
          alt="Article image"
          className="article-card-image"
        />
        <div className="article-card-content">
          <Link to={`/articles/${article.article_id}`}>
            <h3>{article.title}</h3>
          </Link>
          <div className="metadata">
            <p className="pill">
              <strong>Author:</strong> {article.author}
            </p>
            <p className="pill">
              <strong>Topic:</strong> {article.topic}
            </p>
            <p className="pill">
              <strong>Date:</strong> {convertDate(article.created_at)}
            </p>
            <p className="pill">
              <strong>Votes:</strong> {article.votes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
