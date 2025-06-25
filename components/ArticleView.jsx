// This component is for combining ArticleDetail (by id) + associated Comments + Comment posting

import ArticleDetail from "./ArticleDetail";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

function ArticleView() {
  return (
    <section>
      <ArticleDetail />
      <CommentForm />
      <CommentsList />
    </section>
  );
}

export default ArticleView;
