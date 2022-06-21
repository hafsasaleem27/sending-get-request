import React, { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import { ThreeDots } from "react-loader-spinner";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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

    setError(false);
    setIsLoading(true);
    try {
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
    } catch (error) {
      // error is an object here with message property containing the error message!
      setError(error.message);
    }
    setIsLoading(false);
  };

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
        <button onClick={fetchMoviesHandler}>Fetch movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies to show</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <ThreeDots color="#000000" height={40} width={40} />} */}
        {content}
      </section>
    </React.Fragment>
  );
};

export default App;
