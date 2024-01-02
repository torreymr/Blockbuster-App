import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Requests";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MainRow = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className="text-white pt-[1rem] flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold pb-[1rem]">
          What's Popular?
        </h1>
        <div className="w-full h-[600px] flex items-center">
          <div className="w-full h-[500px] flex items-center relative group">
            <FaArrowLeft
              className="absolute hidden left-0 group-hover:block opacity-50 hover:opacity-100 cursor-pointer"
              size={30}
              onClick={slideLeft}
            />
            <div
              id={"slider"}
              className="h-[100%] flex items-center overflow-x-scroll scroll-smooth scrollbar-hide whitespace-nowrap gap-[1.5rem]"
            >
              {movies.map((item, id) => (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                  alt={item?.title}
                  className="h-full object-cover cursor-pointer"
                />
              ))}
            </div>
            <FaArrowRight
              className="absolute hidden right-0 group-hover:block opacity-50 hover:opacity-100 cursor-pointer"
              size={30}
              onClick={slideRight}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRow;
