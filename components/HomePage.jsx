import Sidebar from "./Sidebar";
import TopFilterBar from "./TopFilterBar";
import ArticlesList from "./ArticlesList";

function HomePage() {
  return (
    <>
      <TopFilterBar />
      <div className="content-layout">
        <Sidebar />
        <ArticlesList />
      </div>
    </>
  );
}

export default HomePage;
