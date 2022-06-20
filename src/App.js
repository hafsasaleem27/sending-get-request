import React, { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async (event) => {
    // event.preventDefault();

    /* fetch with then/catch blocks */

    // fetch("https://swapi.dev/api/films")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     const transformedMovieData = data.results.map((movieData) => {
    //       return {
    //         id: movieData.episode_id,
    //         name: movieData.title,
    //         openingText: movieData.opening_crawl,
    //         releaseDate: movieData.release_date,
    //       };
    //     });
    //     setMovies(transformedMovieData);
    //   })
    //   .catch((err) => console.log(err));

    /* fetch with async/await */

    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();

    const transformedMovieData = data.results.map(movieData => {
      return {
        id: movieData.episode_id,
        name: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovieData);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies to show</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
};

export default App;
