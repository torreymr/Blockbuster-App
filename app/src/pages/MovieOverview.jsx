import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import requests from "../Requests.js";
import Navbar from "../components/Navbar.jsx";
import Searchbar from "../components/Searchbar.jsx";

const MovieOverview = () => {
  const [movie, setMovie] = useState([]);
  const [movieImages, setmovieImages] = useState([]);
  const { id: movieID } = useParams();

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    axios.get(requests.requestMovie(movieID)).then((response) => {
      setMovie(response.data);
    });

    axios.get(requests.requestMovieImages(movieID)).then((response) => {
      setmovieImages(response.data);
    });
  }, []);

  return (
    <>
      <div className="w-full background-color min-h-[100vh]">
        {isDropdownVisible && (
          <Searchbar
            toggleDropdown={toggleDropdown}
            isActive={isDropdownVisible}
          />
        )}
        <Navbar toggleDropdown={toggleDropdown} />
        <div className="h-full w-full md:px-[8rem] px-[1rem] pb-[2rem] pt-[8rem]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt={movie?.title}
            className="h-[45rem] w-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default MovieOverview;
