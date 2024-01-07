import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import requests from "../Requests";

const MovieDetails = () => {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(requests.requestMovie(id)).then((response) => {
      setMovie(response.data);
    });
  });

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={movie?.title}
      />
      <h1 className="text-black">{movie?.title}</h1>
    </div>
  );
};

export default MovieDetails;
