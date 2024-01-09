import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../Requests";
import Movie from "../Home-Page-Components/Movie";

const Main = () => {
  const [movie, setMovie] = useState([]);
  const [movieProviders, setmovieProviders] = useState([]);
  const { id: movieID } = useParams();

  useEffect(() => {
    axios.get(requests.requestMovie(movieID)).then((response) => {
      setMovie(response.data);
    });

    axios.get(requests.requestMovieProviders(movieID)).then((response) => {
      const { buy, rent, frontrate } = response.data.results.US;

      const provider = frontrate || buy;
      console.log(provider);

      setmovieProviders(provider);
      console.log(movieProviders);
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
      <div className="h-full w-full absolute left-0 top-0 flex flex-col justify-between text-white">
        <div className="bg-black opacity-95 py-4 px-2 font-bold flex items-center justify-center gap-4">
          Streaming on
          <img
            src={`https://image.tmdb.org/t/p/original${movieProviders}`}
            alt="default"
            className="w-[2rem] h-auto"
          />
        </div>
        <div>
          <p>Main stuff</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
