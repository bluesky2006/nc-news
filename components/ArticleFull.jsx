import { useEffect, useState } from "react";
import { fetchArticleById } from "../src/api";
import { useParams } from "react-router-dom";
import { convertDate } from "../utils";

function ArticleFull() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);

  let { article_id } = useParams();

  useEffect(() => {
    setLoading("Loading");
    setError(null);
    setArticle(null);

    fetchArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
        setLoading("");
        console.log(article, "<< article in ArticleFull");
      })
      .catch((err) => {
        console.log(err, "<< error in ArticleFull>>");
        setError(err.msg);
        setLoading("");
      });
  }, [article_id]);

  if (error) {
    return (
      <section>
        <p>No article</p>
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

  return (
    <section>
      <div>
        <div className="article-card">
          <h3>{article.title}</h3>
          <div className="article-card-header">
            <img
              src={article.article_img_url}
              alt="Article image"
              className="article-image"
            />
            <p>{article.body}</p>
          </div>
          <div>
            <div className="article-card-metadata">
              <p className="pill">Author: {article.author}</p>
              <p className="pill">Topic: {article.topic}</p>
              <p className="pill">Date: {convertDate(article.created_at)}</p>
              <p className="pill">Votes: {article.votes}</p>
              <p className="pill">Comments: {article.comment_count}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArticleFull;
