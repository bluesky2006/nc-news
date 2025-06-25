import { Link } from "react-router-dom";
import { convertDate } from "../utils";

function ArticleCard({ article }) {
  return (
    <div key={article.article_id} className="article-card">
      <Link to={`/article/${article.article_id}`}>
        <div className="article-card-header">
          <img
            src={article.article_img_url}
            alt="Article image"
            className="article-card-image"
          />
          <h3>{article.title}</h3>
        </div>
      </Link>

      <div>
        <div className="article-metadata">
          <p className="pill">Author: {article.author}</p>
          <p className="pill">Topic: {article.topic}</p>
          <p className="pill">Date: {convertDate(article.created_at)}</p>
          <p className="pill">Votes: {article.votes}</p>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
