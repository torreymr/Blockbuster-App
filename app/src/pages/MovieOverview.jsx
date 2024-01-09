import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import requests from "../Requests.js";
import Navbar from "../components/Global-Components/Navbar.jsx";
import Searchbar from "../components/Global-Components/Mobile searchbar.jsx";
import Main from "../components/Movie-Overview-Components/Main.jsx";

const MovieOverview = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
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
        <div className="h-full w-full md:px-[8rem] px-[1rem] pb-[2rem] pt-[8rem] relative">
          <Main />
        </div>
      </div>
    </>
  );
};

export default MovieOverview;
