import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProviderIcon,
  getProviderMovies,
} from "../../utilities/apiUtils.mjs";
import LoadingScreen from "../Global-Components/LoadingScreen";

const Row = ({ type, provider, rowID, pages }) => {
  const [providerMovies, setProviderMovies] = useState(null);
  const [providerIcon, setProviderIcon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const gatherData = async () => {
      const providerIcon = await getProviderIcon(provider);
      setProviderIcon(providerIcon);
      const providerMoviesResponse = await getProviderMovies(
        type,
        provider,
        pages
      );
      setProviderMovies(providerMoviesResponse);
      setLoading(false);
    };

    gatherData();
  }, []);

  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="text-white flex flex-col gap-4">
          <div className="flex gap-4 items-center h-[4rem]">
            <div className="text-4xl font-bold">Top Rated on</div>
            <img
              src={`https://image.tmdb.org/t/p/original/${providerIcon}`}
              className="h-full w-auto rounded-lg"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto">
            {providerMovies &&
              providerMovies.map((movie) => (
                <div key={movie.id} className="relative">
                  <img
                    className="max-w-[15rem] h-auto object-cover cursor-pointer"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    onClick={() => handleMovieClick(movie.id)}
                  />
                  <div className="absolute top-0 right-0 h-[3.5rem] w-[3.5rem] bg-black opacity-40 cursor-pointer rounded-bl-lg rounded-br-lg"></div>
                  <div className="absolute top-0 right-0 h-[3.5rem] w-[3.5rem] p-4 flex items-center justify-center text-xs font-bold">
                    {movie.vote_average}/10
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Row;
