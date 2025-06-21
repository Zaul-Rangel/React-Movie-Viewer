// This lets us link between pages without reloading the whole app
import { Link } from "react-router-dom";

// Styles specifically for the navbar
import "../css/Navbar.css";

// This is the NavBar component that shows up at the top of the page
function NavBar() {
  return (
    <nav className="navbar">
      {/* This is the app's logo or title — clicking it sends you to the home page */}
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>

      {/* These are the navigation links — Home and Favorites */}
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

// Exporting the NavBar so other parts of the app can use it
export default NavBar;
