import { fetchCommentsById } from "../src/api";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import useApiRequest from "../utils";

function CommentsList() {
  let { article_id } = useParams();

  const {
    data: comments,
    setData: setComments,
    loading,
    error,
  } = useApiRequest(fetchCommentsById, article_id);

  return loading ? (
    <p>Loading comments...</p>
  ) : error === 404 ? (
    <p>No comments exist for that article.</p>
  ) : (
    <section>
      <CommentForm
        article_id={article_id}
        setComments={setComments}
        comments={comments}
      />
      <h2>Comments</h2>
      <Comment setComments={setComments} comments={comments} />
    </section>
  );
}

export default CommentsList;
