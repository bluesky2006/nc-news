import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">
        <div className="header-div">
          <h1>northcoder news</h1>
        </div>
      </Link>
    </header>
  );
}

export default Header;
