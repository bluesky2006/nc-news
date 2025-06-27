export function fetchArticles(sortBy = "created_at", order = "desc") {
  return fetch(
    `https://nc-news-3jz4.onrender.com/api/articles?sort_by=${sortBy}&order=${order}`
  )
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch articles",
        });
      }
      return res.json();
    })
    .then((articles) => {
      return articles;
    });
}

export function fetchArticleById(article_id) {
  return fetch(`https://nc-news-3jz4.onrender.com/api/articles/${article_id}`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch article",
        });
      }
      return res.json();
    })
    .then((article) => {
      return article;
    });
}

export function fetchCommentsById(article_id) {
  return fetch(
    `https://nc-news-3jz4.onrender.com/api/articles/${article_id}/comments`
  )
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch comments",
        });
      }
      return res.json();
    })
    .then((comments) => {
      return comments;
    });
}

export function patchArticleVoteById(article_id, inc_votes) {
  const body = JSON.stringify({ inc_votes });

  return fetch(`https://nc-news-3jz4.onrender.com/api/articles/${article_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to inrease vote",
        });
      }
      return res.json();
    })
    .then((article) => {
      return article;
    });
}

export function postCommentById(article_id, commentBody) {
  const body = JSON.stringify(commentBody);

  return fetch(
    `https://nc-news-3jz4.onrender.com/api/articles/${article_id}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  )
    .then((res) => {
      if (!res.ok) {
        console.log(res, "res");

        return Promise.reject({
          status: res.status,
          msg: "Failed to post comment",
        });
      }
      return res.json();
    })
    .then((comment) => {
      return comment;
    });
}

export function deleteCommentById(comment_id) {
  return fetch(`https://nc-news-3jz4.onrender.com/api/comments/${comment_id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject({
        status: res.status,
        msg: "Failed to delete comment",
      });
    }
    return "Comment deleted";
  });
}

export function fetchTopics() {
  return fetch("https://nc-news-3jz4.onrender.com/api/topics")
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch topics",
        });
      }
      return res.json();
    })
    .then((topics) => {
      return topics;
    });
}

// To add: sort_by, order?
export function fetchArticlesByTopic(topic) {
  return fetch(`https://nc-news-3jz4.onrender.com/api/articles?topic=${topic}`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: "Failed to fetch topic",
        });
      }
      return res.json();
    })
    .then(({ articles }) => {
      return articles;
    });
}
