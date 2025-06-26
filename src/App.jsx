import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import ArticleView from "../components/ArticleView";
import HomePage from "../components/HomePage";
import ArticleListByTopic from "../components/ArticleListByTopic";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:article_id" element={<ArticleView />} />
        <Route path="/topics/:topic" element={<ArticleListByTopic />} />
      </Routes>
    </main>
  );
}

export default App;
