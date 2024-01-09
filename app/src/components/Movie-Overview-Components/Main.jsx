import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../Requests";

const Main = () => {
  const [movie, setMovie] = useState([]);
  const [movieImages, setmovieImages] = useState([]);
  const { id: movieID } = useParams();

  useEffect(() => {
    axios.get(requests.requestMovie(movieID)).then((response) => {
      setMovie(response.data);
    });

    axios.get(requests.requestMovieImages(movieID)).then((response) => {
      setmovieImages(response.data);
    });
  }, []);
  return (
    <div className="h-full w-full">
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie?.title}
        className="h-[45rem] w-full object-cover"
      />
    </div>
  );
};

export default Main;
