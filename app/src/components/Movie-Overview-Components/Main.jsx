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
      setmovieImages(response.data.logos[0]);
    });
  }, []);
  return (
    <div className="h-[45rem] w-full relative">
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie?.title}
        className="h-full w-full object-cover absolute top-0 left-0"
      />
      <div className="bg-gradient-to-r from-black h-full w-full absolute top-0 left-0"></div>
      <div className="h-full w-full absolute left-0 top-0 flex flex-col justify-end">
        <div className="px-[1rem]">
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Main;
