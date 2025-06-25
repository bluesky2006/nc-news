export function fetchArticles(startIndex, endIndex) {
  return fetch("https://nc-news-3jz4.onrender.com/api/articles")
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
      return articles.articles.slice(startIndex, endIndex);
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

export function increaseArticleVoteById(article_id) {
  const body = JSON.stringify({ inc_votes: 1 });

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

export function decreaseArticleVoteById(article_id) {
  const body = JSON.stringify({ inc_votes: -1 });

  return fetch(`https://nc-news-3jz4.onrender.com/api/artiles/${article_id}`, {
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
          msg: "Failed to decrease vote",
        });
      }
      return res.json();
    })
    .then((article) => {
      return article;
    });
}
