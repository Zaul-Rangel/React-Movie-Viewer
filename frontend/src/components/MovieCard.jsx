// Bringing in the CSS just for this movie card component
import "../css/MovieCard.css";

// This gives us access to favorites logic from the MovieContext
import { useMovieContext } from "../contexts/MovieContext";

// The MovieCard takes in a single movie object as a prop
function MovieCard({ movie }) {
  // Pulling in context helpers so we can check if it's a favorite and toggle it
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  // Checking if this particular movie is already in the favorites list
  const favorite = isFavorite(movie.id);

  // When the heart button is clicked, either add or remove the movie from favorites
  function onFavoriteClick(e) {
    e.preventDefault(); // Prevents the click from triggering any parent link behavior
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {/* This grabs the movie poster from the TMDB image URL */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        {/* This is the overlay that shows when you hover — it has the heart button */}
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>

      {/* Movie title and release year */}
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>{" "}
        {/* Just showing the year part */}
      </div>
    </div>
  );
}

// Making the component usable elsewhere in the app
export default MovieCard;
