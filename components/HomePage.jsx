import TopicMenu from "./TopicMenu";
import ArticlesList from "./ArticlesList";

function HomePage() {
  return (
    <>
      <TopicMenu variant="topbar" />
      <div className="content-layout">
        <TopicMenu variant="sidebar" />
        <ArticlesList />
      </div>
    </>
  );
}

export default HomePage;
