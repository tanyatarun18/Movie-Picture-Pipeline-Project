import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiUrl =
      process.env.REACT_APP_MOVIE_API_URL ||
      'http://acf4d3da80cbf43a0b5f651fad2a20af-803163676.us-east-1.elb.amazonaws.com';
    axios
      .get(`${apiUrl}/movies`)
      .then((response) => {
        console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
          setMovies(response.data);
        } else if (Array.isArray(response.data.movies)) {
          setMovies(response.data.movies);
        } else {
          console.error('Unexpected API response:', response.data);
          setMovies([]);
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
        setMovies([]);
      });
  }, []);

  return (
    <ul>
      {movies.map((movie) => (
        <li className="movieItem" key={movie.id} onClick={() => onMovieClick(movie)}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;
