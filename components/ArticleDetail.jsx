import { useEffect, useState } from "react";
import {
  fetchArticleById,
  increaseArticleVoteById,
  decreaseArticleVoteById,
} from "../src/api";
import { useParams } from "react-router-dom";
import { convertDate } from "../utils";

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const [voteError, setVoteError] = useState(null);

  let { article_id } = useParams();

  useEffect(() => {
    setLoading("Loading");
    setError(null);
    setArticle(null);

    fetchArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
        setLoading("");
        console.log(article, "<< article in ArticleDetail");
      })
      .catch((err) => {
        console.log(err, "<< error in ArticleDetail>>");
        setError(err.msg);
        setLoading("");
      });
  }, [article_id]);

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    );
  }

  if (!article) {
    return (
      <section>
        <p>{loading}</p>
      </section>
    );
  }

  const upVote = (article_id) => {
    setArticle((currentArticle) => {
      if (currentArticle.article_id == article_id) {
        return { ...currentArticle, votes: currentArticle.votes + 1 };
      }
      console.log(currentArticle);
      return currentArticle;
    });

    increaseArticleVoteById(article_id).catch(() => {
      setArticle((currentArticle) => {
        if (currentArticle.article_id == article_id) {
          return { ...currentArticle, votes: currentArticle.votes - 1 };
        }
        return currentArticle;
      });
      setVoteError("Vote failed. Please try again.");
    });
  };

  const downVote = (article_id) => {
    setArticle((currentArticle) => {
      if (currentArticle.article_id == article_id) {
        return { ...currentArticle, votes: currentArticle.votes - 1 };
      }
      console.log(currentArticle);
      return currentArticle;
    });

    decreaseArticleVoteById(article_id).catch(() => {
      setArticle((currentArticle) => {
        if (currentArticle.article_id == article_id) {
          return { ...currentArticle, votes: currentArticle.votes + 1 };
        }
        return currentArticle;
      });
      setVoteError("Vote failed. Please try again.");
    });
  };

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
            onClick={() => upVote(article_id)}
          >
            thumb_up
          </span>
          <span
            className="material-symbols-outlined"
            onClick={() => downVote(article_id)}
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
