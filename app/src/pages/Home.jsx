import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Searchbar from "../components/Searchbar.jsx";
import MainRow from "../components/MainRow.jsx";
import Movie from "../components/Movie.jsx";
import Row from "../components/Row.jsx";
import requests from "../Requests.js";

const Home = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      {isDropdownVisible && (
        <Searchbar
          toggleDropdown={toggleDropdown}
          isActive={isDropdownVisible}
        />
      )}
      <div className="background-color min-h-[100vh] px-[1rem] pb-[2rem]">
        <Navbar toggleDropdown={toggleDropdown} />
        <MainRow rowID="One" />
        <Row title="Family" fetchURL={requests.requestFamily} rowID="Two" />
        <Movie />
        <Row
          title="Thriller"
          fetchURL={requests.requestThriller}
          rowID="Three"
        />
        <Row title="Action" fetchURL={requests.requestAction} rowID="Four" />
        <Row title="Romance" fetchURL={requests.requestRomance} rowID="Four" />
        <Movie />
      </div>
    </>
  );
};

export default Home;
