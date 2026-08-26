import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieDetail({ movie }) {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    const apiUrl =
      process.env.REACT_APP_MOVIE_API_URL ||
      'http://acf4d3da80cbf43a0b5f651fad2a20af-803163676.us-east-1.elb.amazonaws.com';
    axios.get(`${apiUrl}/movies/${movie.id}`).then((response) => {
      setDetails(response.data);
    });
  }, [movie]);

  return (
    <div>
      <h2>{details?.movie.title}</h2>
      <p>{details?.movie.description}</p>
    </div>
  );
}

export default MovieDetail;
