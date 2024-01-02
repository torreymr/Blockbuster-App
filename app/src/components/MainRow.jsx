import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Requests";

const MainRow = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  return (
    <>
      <div className="text-white pt-[1rem] flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold">What's Popular?</h1>
        <div className="w-full h-[600px] flex flex-col justify-center">
          <div
            id={"slider"}
            className="h-[65%] flex items-center overflow-x-scroll"
          >
            {movies.map((item, id) => (
              <img
                src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`}
                alt={item?.title}
                className="h-full object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRow;
