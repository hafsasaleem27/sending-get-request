import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import { ThreeDots } from "react-loader-spinner";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setError(false);
    setIsLoading(true);

    try {
      const response = await fetch("https://swapi.dev/api/films");
      const data = await response.json();

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          name: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content;

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  if (movies.length === 0 && !error) {
    content = <p>No movies to show</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <ThreeDots color="#000000" height={40} width={40} />;
  }

  return (
    <React.Fragment>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
};

export default App;
