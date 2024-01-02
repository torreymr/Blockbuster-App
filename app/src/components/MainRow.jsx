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
          <div id={"slider"} className="h-[85%]">
            {movies.map((item, id) => (
              <h1>{item?.title}</h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRow;
