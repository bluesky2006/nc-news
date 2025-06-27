import { useState } from "react";
import { fetchArticleById, patchArticleVoteById } from "../src/api";
import { useParams } from "react-router-dom";
import { convertDate } from "../utils";
import useApiRequest from "../utils";

function ArticleDetail() {
  const [voteError, setVoteError] = useState(null);

  let { article_id } = useParams();

  const {
    data: article,
    setData: setArticle,
    loading,
    error,
  } = useApiRequest(fetchArticleById, article_id);

  const castVote = (vote) => {
    setArticle((currentArticle) => {
      if (currentArticle.article_id === Number(article_id)) {
        return { ...currentArticle, votes: currentArticle.votes + vote };
      }
      return currentArticle;
    });

    patchArticleVoteById(article_id, vote).catch(() => {
      setArticle((currentArticle) => {
        if (currentArticle.article_id === Number(article_id)) {
          return { ...currentArticle, votes: currentArticle.votes - vote };
        }
        return currentArticle;
      });
      setVoteError("Vote failed. Please try again.");
    });
  };

  if (loading) {
    return <p>Loading article...</p>;
  }

  if (error === 404) {
    return (
      <p>
        Article does not exist. Try returning to the home page and clicking on
        an article there.
      </p>
    );
  }

  if (!article) {
    return null;
  }

  const {
    article_img_url,
    title,
    body,
    author,
    topic,
    created_at,
    comment_count,
    votes,
  } = article;

  return (
    <section>
      <div className="card">
        <img
          src={article_img_url}
          alt="Article image"
          className="article-detail-image"
        />
        <h2>{title}</h2>
        <p>{body}</p>
        <div id="article-detail-pills" className="metadata">
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
            <strong>Comments:</strong> {comment_count}
          </p>
          <p className="pill">
            <strong>Votes:</strong> {votes}
          </p>
        </div>
        <div className="voting-div">
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
        {voteError && <p className="error-msg">{voteError}</p>}
      </div>
    </section>
  );
}

export default ArticleDetail;
