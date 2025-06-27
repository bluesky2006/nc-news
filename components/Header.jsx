import { Link } from "react-router-dom";
import logo from "../src/assets/logo.svg";

function Header() {
  return (
    <header>
      <Link to="/">
        <div className="header-div">
          <img className="logo" src={logo} alt="Northcoder News logo" />
          <h1>northcoder news</h1>
        </div>
      </Link>
    </header>
  );
}

export default Header;
