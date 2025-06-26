import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">
        <div className="header-div">
          <img
            className="logo"
            src="../src/assets/logo.svg"
            alt="Northcoder News logo"
          />
          <h1>northcoder news</h1>
        </div>
      </Link>
    </header>
  );
}

export default Header;
