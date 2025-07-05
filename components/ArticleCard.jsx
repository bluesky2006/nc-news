import { Link } from "react-router-dom";
import { convertDate } from "../utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function ArticleCard({ article }) {
  const {
    article_id,
    article_img_url,
    title,
    author,
    topic,
    created_at,
    votes,
    comment_count,
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
          <div className="pill-div">
            <p className="pill">Posted by {author}</p>
            <p className="pill">{topic}</p>
            <p className="pill">{convertDate(created_at)}</p>
            <p className="pill">{comment_count} comments</p>
            <p className="pill">{votes} votes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
