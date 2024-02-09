import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProviderIcon,
  getProviderMovies,
} from "../../utilities/apiUtils.mjs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import LoadingScreen from "../Global-Components/LoadingScreen";

const Row = ({ type, provider, pages }) => {
  const [providerMovies, setProviderMovies] = useState(null);
  const [providerIcon, setProviderIcon] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

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

  const handlePrevPage = () => {
    if (containerRef.current) {
      smoothScroll(containerRef.current, -800);
    }
  };

  const handleNextPage = () => {
    if (containerRef.current) {
      smoothScroll(containerRef.current, 800);
    }
  };

  const smoothScroll = (element, distance) => {
    const startTime = performance.now();
    const startOffset = element.scrollLeft;
    const duration = 300;

    const scroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      element.scrollLeft = startOffset + distance * progress;

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
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
          <div className="relative">
            <div
              ref={containerRef}
              className="flex gap-4 overflow-x-auto hide-scrollbar"
            >
              {providerMovies &&
                providerMovies.map((movie, index) => (
                  <div
                    key={movie.id}
                    className="relative transition-transform duration-300"
                  >
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
            <div
              className="absolute hidden lg:block z-[999] left-0 top-[45%] bg-slate-800 p-[1rem] opacity-20 hover:opacity-100 rounded-full cursor-pointer"
              onClick={handlePrevPage}
            >
              <FaArrowLeft className="w-[1.5rem] h-[1.5rem]" />
            </div>
            <div
              className="absolute hidden lg:block z-[999] right-0 top-[45%] bg-slate-800 opacity-20 hover:opacity-100 p-[1rem] rounded-full cursor-pointer"
              onClick={handleNextPage}
            >
              <FaArrowRight className="w-[1.5rem] h-[1.5rem]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Row;
