import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import requests from "../Requests.js";
import Navbar from "../components/Global components/Navbar.jsx";
import Searchbar from "../components/Global components/Mobile searchbar.jsx";
import Main from "../components/Movie overview components/Main.jsx";

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
