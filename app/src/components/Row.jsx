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
        <div className="flex w-full items-center relative group">
          <div className="bg-gray-800 p-4 absolute hidden group-hover:flex opacity-40 hover:opacity-70 justify-center left-0 items-center cursor-pointer md:block rounded-full">
            <FaArrowLeft size={25} onClick={slideLeft} />
          </div>
          <div
            id={"slider" + rowID}
            className="overflow-x-scroll scrollbar-hide flex gap-[1rem] w-[85%] scroll-smooth flex-1"
          >
            {movies.map((item, id) => (
              <img
                src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
                alt={item?.title}
                className="w-[15rem] object-cover cursor-pointer"
              />
            ))}
          </div>
          <div className="bg-gray-800 p-4 hidden group-hover:flex opacity-40 hover:opacity-70 absolute right-0 justify-center items-center cursor-pointer md:block rounded-full">
            <FaArrowRight size={25} onClick={slideRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row;
