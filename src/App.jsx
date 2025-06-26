import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import ArticleView from "../components/ArticleView";
import ArticlesList from "../components/ArticlesList";
import ArticleListByTopic from "../components/ArticleListByTopic";
import FilterBar from "../components/FilterBar";

function App() {
  return (
    <main>
      <Header />
      <FilterBar variant="topbar" />
      <div className="content-layout">
        <FilterBar variant="sidebar" />{" "}
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
