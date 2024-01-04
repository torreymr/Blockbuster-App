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
    slider.scrollLeft = slider.scrollLeft - 340;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 340;
  };

  return (
    <>
      <div className="text-white w-full flex flex-col items-center">
        <div className="flex flex-col items-center w-[80%]">
          <h1 className="text-4xl md:text-5xl font-bold pb-4">
            What's Popular?
          </h1>
          <div className="w-full h-[full] flex items-center justify-center gap-x-[2rem] relative group group">
            <div
              className="absolute bg-gray-800 left-0 p-4 rounded-full opacity-40 hover:opacity-70 cursor-pointer hidden group-hover:block"
              onClick={slideLeft}
            >
              <FaArrowLeft size={30} />
            </div>
            <div
              id={"slider" + rowID}
              className="h-full w-full flex items-center overflow-x-scroll scroll-smooth scrollbar-hide whitespace-nowrap gap-[1rem]"
            >
              {movies.map((item, id) => (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                  alt={item?.title}
                  className="w-[20rem] object-cover cursor-pointer"
                  key={id}
                />
              ))}
            </div>
            <div
              className="absolute bg-gray-800 right-0 p-4 rounded-full opacity-40 hover:opacity-70 cursor-pointer hidden group-hover:block"
              onClick={slideRight}
            >
              <FaArrowRight size={30} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRow;
