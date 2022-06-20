import React, { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";

const App = () => {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = (event) => {
    event.preventDefault();
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovieData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            name: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovieData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch movies</button>
      </section>
      <section>
        <MovieList movies={movies} />
      </section>
    </React.Fragment>
  );
};

export default App;
