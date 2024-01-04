import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Requests";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MainRow = ({ rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className="text-white w-full flex flex-col items-center">
        <div className="flex flex-col items-center w-[80%]">
          <h1 className="text-4xl md:text-5xl font-bold">What's Popular?</h1>
          <div className="w-full h-[700px] flex items-center justify-center gap-x-[2rem] relative group py-[3rem] group">
            <div className="absolute bg-gray-800 left-0 p-4 rounded-full opacity-40 hover:opacity-70 cursor-pointer hidden group-hover:block">
              <FaArrowLeft size={30} onClick={slideLeft} />
            </div>
            <div
              id={"slider" + rowID}
              className="h-full w-full flex items-center overflow-x-scroll scroll-smooth scrollbar-hide whitespace-nowrap gap-[1.5rem]"
            >
              {movies.map((item, id) => (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                  alt={item?.title}
                  className="h-[85%] md:h-full object-cover cursor-pointer"
                />
              ))}
            </div>
            <div className="absolute bg-gray-800 right-0 p-4 rounded-full opacity-40 hover:opacity-70 cursor-pointer hidden group-hover:block">
              <FaArrowRight size={30} onClick={slideRight} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRow;
