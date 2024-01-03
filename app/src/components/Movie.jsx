import axios from "axios";
import React, { useState, useEffect } from "react";
import requests from "../Requests";
import key from "../Requests";

const Movie = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  const movieID = movie?.id;

  useEffect(() => {
    axios.get(requests.requestTopRated).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  return (
    <div className="w-full h-[500px] md:h-[700px] flex items-center relative">
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie?.title}
        className="object-cover h-full w-full"
      />
      <div className="h-full w-full bg-gradient-to-r from-black opacity-50 flex flex-col justify-end absolute top-0 left-0"></div>
      <div className="h-full w-full absolute top-0 left-0 flex flex-col gap-[1rem] md:pb-[4rem] md:pl-[3rem] justify-end text-white pl-[1rem] pb-[2rem]">
        <h1 className=" text-3xl font-bold md:text-7xl">{movie?.title}</h1>
        <p className="hidden md:block text-lg w-[70%]">{movie?.overview}</p>
        <button className="bg-white w-[8rem] h-[3rem] md:w-[11rem] md:h-[4rem] text-black rounded-lg font-bold">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default Movie;
