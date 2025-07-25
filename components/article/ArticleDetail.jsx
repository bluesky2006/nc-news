import { convertDateWithTime } from "../../utils";
import { patchArticleVoteById } from "../../src/api";
import { useState } from "react";

function ArticleDetail({ article, commentCount }) {
  const [voteError, setVoteError] = useState(null);
  const [localArticle, setLocalArticle] = useState(article);

  const {
    article_id,
    article_img_url,
    title,
    body,
    author,
    topic,
    created_at,
    votes,
  } = localArticle;

  const castVote = (vote) => {
    setLocalArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes + vote,
    }));

    patchArticleVoteById(article_id, vote)
      .then(() => setVoteError(null))
      .catch(() => {
        setLocalArticle((currentArticle) => ({
          ...currentArticle,
          votes: currentArticle.votes - vote,
        }));
        setVoteError("Vote failed. Please try again.");
      });
  };

  return (
    <section>
      <div className="card">
        <img
          src={article_img_url}
          alt={`Image for article titled "${title}"`}
          className="article-detail-image"
        />
        <h2>{title}</h2>
        <div className="masthead-combined">
          <div className="masthead">
            <p>Posted by {author}</p>
            <p className="divider-bars">|</p>
            <p>{convertDateWithTime(created_at)}</p>
            <p className="divider-bars">|</p>
            <p>{topic}</p>
          </div>
          <div className="masthead">
            <p>
              <span className="vote-number">
                <strong>{votes}</strong> votes
              </span>
            </p>
            <span
              className="thumb-button material-symbols-outlined"
              onClick={() => castVote(1)}
            >
              thumb_up
            </span>
            <span
              className="thumb-button material-symbols-outlined"
              onClick={() => castVote(-1)}
            >
              thumb_down
            </span>
          </div>
        </div>
        <p>{body}</p>
        {voteError && (
          <div className="error-container">
            <p className="error-msg">{voteError}</p>
          </div>
        )}
      </div>
      <div className="comment-title">
        <h2>Comments</h2>
        <p className="divider-bars">|</p>
        <p className="comment-count">{commentCount}</p>
      </div>
    </section>
  );
}

export default ArticleDetail;
