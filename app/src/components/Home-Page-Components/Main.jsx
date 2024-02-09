import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchRandomMovieIDFromList,
  getMovieCertification,
  getMovieDetails,
  getMovieDirector,
  getMovieProvider,
  getMovieTrailer,
} from "../../utilities/apiUtils.mjs";
import { fetchTopRatedMovies } from "../../services/apiService.mjs";
import DesktopTrailerComponent from "../Trailer-Components/TrailerComponent";
import LoadingScreen from "../Global-Components/LoadingScreen";

const TodaysPick = () => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const truncateOverview = (overview, maxLength) => {
    const words = overview.split(" ");

    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return overview;
  };

  const handleWatchTrailerClickMobile = () => {
    if (movieInfo && movieInfo.movieTrailer && movieInfo.movieTrailer.key) {
      const trailerUrl = `https://www.youtube.com/watch?v=${movieInfo.movieTrailer.key}`;
      window.open(trailerUrl, "_blank");
    }
  };

  const handleWatchTrailerClick = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const handleDetailsButton = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    const getMovieID = async () => {
      try {
        const randomPageNumber = Math.floor(Math.random() * 30) + 1;
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
        setLoading(false);
      } catch (error) {
        console.error("Error");
      }
    };

    gatherData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="w-full mh-[40rem]">
          <div className="flex flex-col items-center gap-3 text-white xl:hidden">
            {movieInfo ? (
              <>
                <div className="h-auto w-full">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movieInfo.movieDetails.poster_path}`}
                    alt={`${movieInfo.movieDetails.title} poster`}
                    className="w-full h-full"
                  />
                </div>
                <div className="text-3xl text-center font-bold">
                  {movieInfo.movieDetails.title}
                </div>
                <div className="w-full flex justify-center py-2">
                  {movieInfo.movieDetails.genres
                    .slice(0, 4)
                    .map((genre, index) => (
                      <div
                        key={index}
                        className="text-lg flex font-bold text-gray-300"
                      >
                        <div className="px-2">{genre}</div>
                        <div className="">
                          {index < movieInfo.movieDetails.genres.length - 1 &&
                            "•"}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between w-full">
                  {movieInfo.movieTrailer.key ? (
                    <div
                      className="w-[13rem] h-[4rem] 2xl:h-[5rem] md:w-[18rem] 2xl:text-xl font-bold opacity-85 bg-white text-black rounded-xl border-2 border-black cursor-pointer flex justify-center items-center"
                      onClick={handleWatchTrailerClickMobile}
                    >
                      Watch Trailer
                    </div>
                  ) : null}
                  <button className="border-2 border-solid border-white w-[13rem] md:w-[18rem] h-[4rem] rounded-lg bg-black text-white font-bold">
                    Details
                  </button>
                </div>
              </>
            ) : (
              <div></div>
            )}
          </div>
          <div className="hidden w-full h-[40rem] xl:block">
            {movieInfo ? (
              <>
                <div className="w-full h-full relative">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movieInfo.movieDetails.backdrop_path}`}
                    alt={`${movieInfo.movieDetails.title} backdrop`}
                    className="w-full h-full object-cover absolute top-0 left-0 opacity-20"
                  />

                  {movieInfo.movieProvider ? (
                    <>
                      <div className="w-full h-[5rem] text-white bg-black absolute top-0 left-0 opacity-50 flex justify-center items-center z-10"></div>
                      <div className="w-full h-[5rem] absolute top-0 left-0 flex justify-center items-center text-white font-bold text-xl z-20">
                        {movieInfo.movieProvider.type === "flatrate" ? (
                          <div className="flex gap-[1rem] items-center text-3xl">
                            Streaming on
                            <img
                              src={`https://image.tmdb.org/t/p/original/${movieInfo.movieProvider.logo_path}`}
                              alt={`${movieInfo.movieProvider.provider_name} logo`}
                              className="w-[3.5rem] h-auto rounded-lg"
                            />
                          </div>
                        ) : movieInfo.movieProvider.type === "free" ? (
                          <div className="flex gap-4 items-center text-3xl">
                            Free to Watch on
                            <img
                              src={`https://image.tmdb.org/t/p/original/${movieInfo.movieProvider.logo_path}`}
                              alt={`${movieInfo.movieProvider.provider_name} logo`}
                              className="w-[3.5rem] h-auto rounded-lg"
                            />
                          </div>
                        ) : movieInfo.movieProvider.type === "rent" ? (
                          <div className="flex gap-4 items-center text-3xl">
                            Available to Rent on
                            <img
                              src={`https://image.tmdb.org/t/p/original/${movieInfo.movieProvider.logo_path}`}
                              alt={`${movieInfo.movieProvider.provider_name} logo`}
                              className="w-[3.5rem] h-auto rounded-lg"
                            />
                          </div>
                        ) : movieInfo.movieProvider.type === "buy" ? (
                          <div className="flex gap-4 items-center text-3xl">
                            Available to Buy on
                            <img
                              src={`https://image.tmdb.org/t/p/original/${movieInfo.movieProvider.logo_path}`}
                              alt={`${movieInfo.movieProvider.provider_name} logo`}
                              className="w-[3.5rem] h-auto rounded-lg"
                            />
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div></div>
                  )}
                  <div className="w-full h-full absolute flex justify-center items-center">
                    <div className="w-[95%] h-full flex gap-8 items-center">
                      <div className="w-[30rem] h-full m-auto">
                        <img
                          className="h-[40rem] w-full object-cover rounded-lg"
                          src={`https://image.tmdb.org/t/p/original/${movieInfo.movieDetails.poster_path}`}
                          alt={`${movieInfo.movieDetails.title} poster`}
                        />
                      </div>
                      <div className="w-[75%] h-[75%] flex flex-col text-white py-8">
                        <div className="w-full flex justify-between">
                          <div className="w-full flex justify-between items-center gap-4">
                            <div className="text-6xl font-bold pb-4">
                              {movieInfo.movieDetails.title}
                            </div>
                            <div className="text-3xl font-bold">{`${movieInfo.movieDetails.vote_average}/10`}</div>
                          </div>
                        </div>
                        <div className="flex gap-6 text-gray-400 font-bold">
                          <span>{movieInfo.movieCertification}</span>
                          <span>{movieInfo.movieDetails.release_date}</span>
                          <div className="flex items-center">
                            {movieInfo.movieDetails.genres.map(
                              (genre, index) => (
                                <div
                                  key={index}
                                  className="flex font-bold text-gray-400"
                                >
                                  <div className="px-2">{genre}</div>
                                  <div className="">
                                    {index <
                                      movieInfo.movieDetails.genres.length -
                                        1 && "•"}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                          <span>{movieInfo.movieDetails.runtime}</span>
                        </div>
                        <div className="font-bold py-2">
                          Directed by {movieInfo.movieDirector}
                        </div>
                        <div className="flex flex-col pb-[2rem]">
                          <div className="text-lg">
                            {truncateOverview(
                              movieInfo.movieDetails.overview,
                              45
                            )}
                          </div>
                        </div>
                        <div className="flex w-[90%] m-auto justify-center gap-[8rem]">
                          {movieInfo.movieTrailer.key ? (
                            <button
                              className="w-[13rem] h-[4rem] 2xl:h-[5rem] 2xl:text-xl font-bold opacity-85 bg-white text-black rounded-xl border-2 border-black"
                              onClick={handleWatchTrailerClick}
                            >
                              Watch Trailer
                            </button>
                          ) : null}
                          <button
                            className="w-[13rem] h-[4rem] 2xl:h-[5rem] 2xl:text-xl font-bold opacity-85 bg-black text-white rounded-xl border-2 border-white"
                            onClick={() =>
                              handleDetailsButton(movieInfo.movieDetails.id)
                            }
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {showTrailer && movieInfo && movieInfo.movieTrailer ? (
                  <DesktopTrailerComponent
                    videoId={movieInfo.movieTrailer.key}
                    onClose={handleCloseTrailer}
                  />
                ) : null}
              </>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TodaysPick;
