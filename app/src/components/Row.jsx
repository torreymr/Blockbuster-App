import React, { useState, useEffect } from "react";
import axios from "axios";

const Row = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  return (
    <div className="text-white md:px-[5.5rem]">
      <div className="h-[500px] flex flex-col justify-center">
        <h1 className="text-3xl font-bold pb-[1rem]">{title}</h1>
        <div id={"slider"} className="overflow-x-scroll flex gap-[1rem]">
          {movies.map((item, id) => (
            <img
              src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
              alt={item?.title}
              className="w-[15rem] object-cover cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Row;
