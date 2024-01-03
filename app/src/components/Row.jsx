import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="text-white">
      <div className="h-[500px] flex flex-col items-center w-full justify-center">
        <h1 className="text-3xl font-bold pb-[1rem]">{title}</h1>
        <div className="flex w-full items-center justify-center gap-[1rem]">
          <FaArrowLeft
            className="opacity-50 hover:opacity-100 cursor-pointer hidden md:block"
            size={30}
            onClick={slideLeft}
          />
          <div
            id={"slider" + rowID}
            className="overflow-x-scroll scrollbar-hide flex gap-[1rem] w-[85%] scroll-smooth"
          >
            {movies.map((item, id) => (
              <img
                src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
                alt={item?.title}
                className="w-[15rem] object-cover cursor-pointer"
              />
            ))}
          </div>
          <FaArrowRight
            className="opacity-50 hover:opacity-100 cursor-pointer hidden md:block"
            size={30}
            onClick={slideRight}
          />
        </div>
      </div>
    </div>
  );
};

export default Row;
