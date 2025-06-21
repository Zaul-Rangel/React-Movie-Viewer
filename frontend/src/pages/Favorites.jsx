// Bringing in the CSS for this page so it looks the way we want
import "../css/Favorites.css";

// This custom hook gives us access to whatever's inside the MovieContext (like favorite movies)
import { useMovieContext } from "../contexts/MovieContext";

// Component that displays each movie nicely
import MovieCard from "../components/MovieCard";

// This is the Favorites page where we show all the movies the user has favorited
function Favorites() {
  // Pulling the list of favorites from context — this is shared global state
  const { favorites } = useMovieContext();

  // If the user has some favorite movies, show them in a grid
  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            // For each movie, we use MovieCard to display it
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  // If there are no favorites, show a little message instead
  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

// Make the Favorites component available for use in other parts of the app
export default Favorites;
