import React, { useState, useEffect } from "react";
import {
  fetchMovieDetails,
  fetchMovieProviders,
  fetchMovieReleaseDates,
  fetchTopRatedMovies,
} from "../../services/apiService";

const TodaysPick = () => {
  // const setRuntime = (time) => {
  //   const hours = Math.floor(time / 60);
  //   const minutes = time % 60;

  //   return `${hours}h ${minutes}m`;
  // };
  // useEffect(() => {
  //   let movieID;

  //   const fetchData = async () => {
  //     try {
  //       // Fetching top rated movies
  //       const randomPage = Math.floor(Math.random() * 10) + 1;
  //       const moviesParams = {
  //         page: randomPage,
  //         language: "en-US",
  //       };
  //       const moviesResponse = await fetchTopRatedMovies(moviesParams);
  //       // Getting random movie
  //       const randomIndex = Math.floor(
  //         Math.random() * moviesResponse.results.length
  //       );
  //       const randomMovie = moviesResponse.results[randomIndex];
  //       movieID = randomMovie.id;

  //       // Fetching random movie details
  //       const movieParams = {
  //         language: "en-US",
  //       };
  //       const detailsResponse = await fetchMovieDetails(movieParams, movieID);
  //       setMovie(detailsResponse);

  //       // Fetching movie certification
  //       const releaseDatesResponse = await fetchMovieReleaseDates(movieID);
  //       const releaseDates = releaseDatesResponse.results;
  //       const getMovieRating = (data) => {
  //         const usData = data?.find((item) => item.iso_3166_1 === "US");

  //         if (usData) {
  //           const releaseDates = usData.release_dates;

  //           for (let i = 0; i < releaseDates.length; i++) {
  //             if (releaseDates[i].certification !== "") {
  //               const certification = releaseDates[i].certification;
  //               return certification;
  //             } else {
  //               for (const result of data) {
  //                 for (const releaseDate of result.release_dates) {
  //                   if (releaseDate.certification !== "") {
  //                     const certification = releaseDate.certification;
  //                     return certification;
  //                     break;
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       };
  //       setMovieRating(getMovieRating(releaseDates));

  //       // // Fetching movie providers
  //       // const movieProviders = await fetchMovieProviders(movieID);
  //     } catch (error) {
  //       console.error("Error fetching data", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="w-full h-[40rem] flex flex-col items-center">
      <div></div>
      <div></div>
      <div className="w-full"></div>
    </div>
  );
};

export default TodaysPick;
