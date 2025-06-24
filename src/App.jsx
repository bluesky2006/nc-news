import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import ArticlesList from "../components/ArticlesList";
import ArticleDetail from "../components/ArticleDetail";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/article/:article_id" element={<ArticleDetail />} />
      </Routes>
    </main>
  );
}

export default App;
