import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../Requests";

const MainDetails = () => {
  const [movie, setMovie] = useState(null);
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

  const { id: movieID } = useParams();

  useEffect(() => {
    axios.get(requests.requestMovie(movieID)).then((response) => {
      setMovie(response.data);
    });

    axios.get(requests.requestMovieProviders(movieID)).then((response) => {});
  }, []);

  return (
    <div className="text-white py-[1rem] flex flex-col gap-1">
      <div className="font-bold text-4xl">{movie?.title}</div>
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
