// This brings in the main CSS styling for the app
import "./css/App.css";

// These are the pages for different routes
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

// These are tools from React Router to help with page navigation
import { Routes, Route } from "react-router-dom";

// This is a context provider so we can share movie data across the app without passing props everywhere
import { MovieProvider } from "./contexts/MovieContext";

// This is the navigation bar that sits at the top of the app
import NavBar from "./components/NavBar";

// This is the main App component where everything comes together
function App() {
  return (
    // Wrapping everything in MovieProvider so any component inside can access movie-related data
    <MovieProvider>
      {/* Shows the nav bar at the top of every page */}
      <NavBar />

      {/* This is where the main content of each page will show up */}
      <main className="main-content">
        <Routes>
          {/* When the user is at the root URL, show the Home page */}
          <Route path="/" element={<Home />} />

          {/* When the user goes to /favorites, show the Favorites page */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

// This just makes the App component usable in other files
export default App;
