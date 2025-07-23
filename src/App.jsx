import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import ArticleView from "../components/article/ArticleView";
import ArticlesList from "../components/article/ArticlesList";
import ArticleListByTopic from "../components/article/ArticleListByTopic";
import ErrorScreen from "../components/ErrorScreen";
import Footer from "../components/Footer";

function App() {
  return (
    <main>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<ArticlesList />} />{" "}
          <Route path="/articles/:article_id" element={<ArticleView />} />
          <Route path="/topics/:topic" element={<ArticleListByTopic />} />
          <Route path="*" element={<ErrorScreen />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
