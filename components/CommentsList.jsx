import { fetchCommentsById } from "../src/api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import useApiRequest from "../utils";
import { useState } from "react";

function CommentsList({ article_id }) {
  const {
    data: comments,
    setData: setComments,
    loading,
    error,
  } = useApiRequest(fetchCommentsById, article_id);

  const [deleted, setDeleted] = useState(null);

  return loading ? (
    <p>Loading comments...</p>
  ) : error === 404 ? (
    <p>No comments exist for that article.</p>
  ) : (
    <section>
      <CommentForm
        article_id={article_id}
        comments={comments}
        setComments={setComments}
        setDeleted={setDeleted}
      />
      <Comment
        comments={comments}
        setComments={setComments}
        deleted={deleted}
        setDeleted={setDeleted}
      />
    </section>
  );
}

export default CommentsList;
