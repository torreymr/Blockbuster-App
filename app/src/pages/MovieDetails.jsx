import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=a7bafceb86b756cbdcdc04b163d81543`
      )
      .then((response) => {
        setMovie(response.data);
      });
  });

  return (
    <div>
      <h1 className="text-black">{movie?.title}</h1>
    </div>
  );
};

export default MovieDetails;
