import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import ArticlesList from "../components/ArticlesList";
import ArticleDetail from "../components/ArticleDetail";
import ArticleView from "../components/ArticleView";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/article/:article_id" element={<ArticleView />} />
      </Routes>
    </main>
  );
}

export default App;
