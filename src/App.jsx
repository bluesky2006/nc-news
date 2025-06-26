import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import ArticleView from "../components/ArticleView";
import ArticlesList from "../components/ArticlesList";
import ArticleListByTopic from "../components/ArticleListByTopic";

function App() {
  return (
    <main>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<ArticlesList />} />{" "}
          <Route path="/articles/:article_id" element={<ArticleView />} />
          <Route path="/topics/:topic" element={<ArticleListByTopic />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
