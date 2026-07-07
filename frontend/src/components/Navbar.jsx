import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        📚 <span>BookSys</span>
      </div>

      <ul className="nav-links">
        <li><a href="/dashboard">Home</a></li>
        <li><a href="/mybooks"> My Books</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/history">History</a></li>
      </ul>

      <Link className="btn" to="/">
        Login
      </Link>
    </nav>
  );
}

export default Navbar;