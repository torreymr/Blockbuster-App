import React, { useState, useEffect } from "react";
import {
  fetchMovieDetails,
  fetchTopRatedMovies,
} from "../../services/apiService";

const TodaysPick = () => {
  // const [topRatedMovies, setTopRatedMovies] = useState([]);
  // const [movieID, setMovieID] = useState(null);
  // const [hasMounted, setHasMounted] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    let topRatedMovies;
    let movieID;

    const fetchData = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 5) + 1;
        const moviesParams = {
          page: randomPage,
          language: "en-US",
        };
        const moviesResponse = await fetchTopRatedMovies(moviesParams);
        const randomIndex = Math.floor(
          Math.random() * moviesResponse.results.length
        );
        const randomMovie = moviesResponse.results[randomIndex];
        movieID = randomMovie.id;
        const movieParams = {
          language: "en-US",
        };
        const detailsResponse = await fetchMovieDetails(movieParams, movieID);
        setMovie(detailsResponse);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   const randomPage = Math.floor(Math.random() * 5) + 1;

  //   const params = {
  //     page: randomPage,
  //     language: "en-US",
  //   };

  //   const fetchData = async () => {
  //     try {
  //       const result = await fetchTopRatedMovies(params);
  //       setTopRatedMovies(result);
  //     } catch (error) {
  //       console.error("Error fetching top rated movies:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (topRatedMovies.length > 0) {
  //     const randomMovieIndex = Math.floor(
  //       Math.random() * topRatedMovies.length
  //     );
  //     const moviePick = topRatedMovies[randomMovieIndex];
  //     setMovieID(moviePick?.id);
  //   }
  // }, [topRatedMovies]);

  // useEffect(() => {
  //   if (hasMounted) {
  //     console.log(movieID);
  //   } else {
  //     setHasMounted(true);
  //   }
  // }, [movieID, hasMounted]);

  return (
    <div className="w-full h-[20rem] lg:h-[45rem] relative">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt=""
        className="h-full w-full absolute top-0 left-0 object-cover"
      />
      <div className="h-full w-full absolute top-0 left-0 bg-gradient-to-r from-black to-transparent"></div>
      <div className="h-full w-[75%] absolute top-0 left-0 flex flex-col justify-end text-white pl-2 gap-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="font-bold text-3xl lg:text-7xl">{movie?.title}</div>
          <div className="hidden lg:block">{movie?.runtime}</div>
          <div className="hidden lg:block w-[50rem]">{movie?.overview}</div>
        </div>
        <div className="flex gap-4">
          <button className="w-[8rem] h-[4rem] lg:w-[12rem] lg:h-[6rem] lg:text-xl bg-white text-black font-bold rounded-lg opacity-95">
            Watch Trailer
          </button>
          <button className="w-[8rem] h-[4rem] lg:w-[12rem] lg:h-[6rem] lg:text-xl bg-black font-bold rounded-lg opacity-95">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodaysPick;
