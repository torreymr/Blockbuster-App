import React, { useState, useEffect } from "react";
import {
  fetchRandomMovieIDFromList,
  getMovieCertification,
  getMovieDetails,
  getMovieDirector,
  getMovieProvider,
  getMovieTrailer,
} from "../../utilities/apiUtils.mjs";
import { fetchTopRatedMovies } from "../../services/apiService.mjs";

const TodaysPick = () => {
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    const getMovieID = async () => {
      try {
        const randomPageNumber = Math.floor(Math.random() * 5) + 1;
        const movieId = await fetchRandomMovieIDFromList(
          fetchTopRatedMovies(randomPageNumber)
        );
        return movieId;
      } catch (error) {
        console.error("Error");
      }
    };

    const gatherData = async () => {
      try {
        const movieID = await getMovieID();
        const [
          movieDetails,
          movieTrailer,
          movieDirector,
          movieCertification,
          movieProvider,
        ] = await Promise.all([
          getMovieDetails(movieID),
          getMovieTrailer(movieID),
          getMovieDirector(movieID),
          getMovieCertification(movieID),
          getMovieProvider(movieID),
        ]);

        const movieData = {
          movieDetails,
          movieTrailer,
          movieDirector,
          movieCertification,
          movieProvider,
        };
        setMovieInfo(movieData);
      } catch (error) {
        console.error("Error");
      }
    };

    gatherData();
  }, []);

  return (
    <div className="w-full h-[40rem] flex flex-col items-center justify-end">
      <div className="text-white">
        {movieInfo ? (
          <>
            <div className="h-auto w-[18rem]">
              <img
                src={`https://image.tmdb.org/t/p/original/${movieInfo.movieDetails.poster_path}`}
                alt={movieInfo.movieDetails.title}
                className="w-full h-full"
              />
            </div>
            <div>
              {movieInfo.movieDetails.genres.map((genre, index) => (
                <span key={index} className="text-sm ml-1">
                  {genre}
                </span>
              ))}
            </div>
            <div></div>
          </>
        ) : (
          <div></div>
        )}
      </div>

      <div className="w-full"></div>
    </div>
  );
};

export default TodaysPick;
