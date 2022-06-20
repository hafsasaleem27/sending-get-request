import React from "react";
import Movie from "./Movie";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          name={movie.name}
          openingText={movie.openingText}
          releaseDate={movie.releaseDate}
        ></Movie>
      ))}
    </ul>
  );
};

export default MovieList;
