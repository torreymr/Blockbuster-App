import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../Requests";

const MainDetails = () => {
  const { id: movieID } = useParams();

  useEffect(() => {
    axios.get(requests.requestMovie(movieID)).then((response) => {
      setMovie(response.data);
    });

    axios.get(requests.requestMovieReleaseDates(movieID)).then((response) => {
      setMovieReleaseDates(response.data.results);
    });
  }, []);

  const [movie, setMovie] = useState(null);
  const [movieReleaseDates, setMovieReleaseDates] = useState(null);

  const releaseDate =
    movie?.release_date.split("-")[1] +
    "-" +
    movie?.release_date.split("-")[2] +
    "-" +
    movie?.release_date.split("-")[0];

  const setRuntime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h ${minutes}m`;
  };

  const runtime = setRuntime(movie?.runtime);

  const movieRating = () => {
    const usData = movieReleaseDates?.find((item) => item.iso_3166_1 === "US");

    if (usData) {
      const releaseDates = usData.release_dates;

      for (let i = 0; i < releaseDates.length; i++) {
        const certification = releaseDates[i].certification;

        if (certification) {
          return certification;
        }
      }
    }
  };

  return (
    <div className="text-white py-[1rem] flex flex-col gap-1">
      <div className="font-bold text-4xl">{movie?.title}</div>
      <div className="text-gray-500 font-bold">Rated: {movieRating()}</div>
      <div className="text-gray-500 italic">
        {releaseDate} • {runtime}
      </div>
      <div>{movie?.overview}</div>
      <div className="text-gray-500">
        {movie?.genres.slice(0, 3).map((genre) => (
          <span key={genre.id}>{genre.name.split("-").join(" ")} </span>
        ))}
      </div>
    </div>
  );
};

export default MainDetails;
