import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import ArticleView from "../components/ArticleView";
import HomePage from "../components/HomePage";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:article_id" element={<ArticleView />} />
      </Routes>
    </main>
  );
}

export default App;
