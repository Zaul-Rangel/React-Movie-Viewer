// Pulling in the MovieCard component so we can show each movie as a card
import MovieCard from "../components/MovieCard";

// Bringing in React hooks: useState to track state, and useEffect to run code when the component loads
import { useState, useEffect } from "react";

// These are the two functions that let us talk to the movie API
import { searchMovies, getPopularMovies } from "../services/api";

// Importing the CSS just for this page
import "../css/Home.css";

// This is the Home component – it handles the search and shows movie results
function Home() {
  // Tracks whatever the user types into the search box
  const [searchQuery, setSearchQuery] = useState("");

  // Holds the list of movies we’re going to display
  const [movies, setMovies] = useState([]);

  // If something goes wrong with fetching, we’ll store the error message here
  const [error, setError] = useState(null);

  // This tells us whether we’re currently waiting on a network request
  const [loading, setLoading] = useState(true);

  // useEffect runs one time when the component first loads (because of the empty array [])
  useEffect(() => {
    // This function grabs popular movies from the API and stores them in state
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies); // Save the movies so we can display them
      } catch (err) {
        console.log(err);
        setError("Failed to load movies..."); // Something went wrong
      } finally {
        setLoading(false); // Either way, we’re done loading
      }
    };

    loadPopularMovies(); // Run the function as soon as the page loads
  }, []);

  // This function runs when the user submits the search form
  const handleSearch = async (e) => {
    e.preventDefault(); // Stop the page from reloading
    if (!searchQuery.trim()) return; // Don't search if the input is empty
    if (loading) return; // Avoid stacking requests if one is already running

    setLoading(true); // Show the loading state while we wait
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults); // Show the search results
      setError(null); // Clear any previous errors
    } catch (err) {
      console.log(err);
      setError("Failed to search movies..."); // Show an error message
    } finally {
      setLoading(false); // Done loading
    }
  };

  // This is what actually shows up on the screen
  return (
    <div className="home">
      {/* Search form at the top */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Updates the searchQuery state as the user types
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* If there was an error (like a failed fetch), show it here */}
      {error && <div className="error-message">{error}</div>}

      {/* Show "Loading..." if we’re still waiting, otherwise show the list of movies */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} /> // Each movie is shown using the MovieCard component
          ))}
        </div>
      )}
    </div>
  );
}

// Make this component available to be used in other parts of the app
export default Home;
