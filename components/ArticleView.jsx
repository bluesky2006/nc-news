// This component is for combining ArticleDetail (by id) + associated Comments + Comment posting

import ArticleDetail from "./ArticleDetail";
import CommentsList from "./CommentsList";

function ArticleView() {
  return (
    <section>
      <ArticleDetail />
      <CommentsList />
    </section>
  );
}

export default ArticleView;
