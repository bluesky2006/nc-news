import { useEffect, useState } from "react";
import { fetchArticleById, patchArticleVoteById } from "../src/api";
import { useParams } from "react-router-dom";
import { convertDate } from "../utils";

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [voteError, setVoteError] = useState(null);

  let { article_id } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetchArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [article_id]);

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

  if (error) {
    return <p>Failed to load article</p>;
  }

  if (!article) return null;

  return (
    <section>
      <div className="article-detail">
        <img
          src={article.article_img_url}
          alt="Article image"
          className="article-detail-image"
        />{" "}
        <h3 className="article-detail-title">{article.title}</h3>
        <p>{article.body}</p>
        <div id="article-detail-pills" className="metadata">
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
            <strong>Comments:</strong> {article.comment_count}
          </p>
          <p className="pill">
            <strong>Votes:</strong> {article.votes}
          </p>
        </div>
        <div className="voting-div">
          <span
            className="material-symbols-outlined"
            onClick={() => castVote(1)}
          >
            thumb_up
          </span>
          <span
            className="material-symbols-outlined"
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
