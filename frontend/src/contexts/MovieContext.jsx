// Bringing in the tools we need from React
import { createContext, useState, useContext, useEffect } from "react";

// This creates the actual context, which we’ll use to share movie data across the app
const MovieContext = createContext();

// This custom hook makes it easier to use the context in any component
export const useMovieContext = () => useContext(MovieContext);

// This is the provider component — it wraps around other components to give them access to movie data
export const MovieProvider = ({ children }) => {
  // This holds the list of favorite movies
  const [favorites, setFavorites] = useState([]);

  // On first load, try to get any saved favorites from localStorage
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    // If we find any, update our state with them
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  // Whenever the favorites list changes, we update localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a new movie to the list of favorites
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  // Remove a movie from favorites by filtering it out using its ID
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Check if a movie is already in the favorites list
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // All the stuff we want to share with components that use this context
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  // This wraps the children in our context provider, making all the values available to them
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
