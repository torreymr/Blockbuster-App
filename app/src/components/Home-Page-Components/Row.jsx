import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../../services/apiService";

const Row = ({ type, rowID, title }) => {
  // Fetching Data
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByType = async () => {
      try {
        let fetchedMovies;

        if (type === "popular") {
          fetchedMovies = await fetchPopularMovies();
        } else if (type === "trending") {
          fetchedMovies = await fetchTrendingMovies();
        } else if (type === "upcoming") {
          fetchedMovies = await fetchUpcomingMovies();
        }

        setMovies(fetchedMovies);
      } catch (error) {
        console.error(`Error fetching ${type} movies:`, error);
      }
    };

    fetchMoviesByType();
  }, [type]);

  //Navigate Function
  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="text-white">
      <div className="h-[full] flex flex-col items-center w-full justify-center pt-4">
        <h1 className="text-4xl font-bold w-full pb-4">{title}</h1>
        <div className="flex w-full items-center relative group">
          <div
            id={"slider" + rowID}
            className="flex overflow-x-auto gap-[1rem] w-[85%] scroll-smooth flex-1 slider"
          >
            {movies.map((item, id) => (
              <img
                src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                alt={item?.title}
                className="w-[10rem] object-cover cursor-pointer"
                key={id}
                onClick={() => handleMovieClick(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row;
