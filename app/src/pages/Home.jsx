import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Searchbar from "../components/Searchbar.jsx";
import MainRow from "../components/MainRow.jsx";
import Movie from "../components/Movie.jsx";
import Row from "../components/Row.jsx";
import requests from "../Requests.js";
import Footer from "../components/Footer.jsx";
import MiddleColumn from "../components/MiddleColumn.jsx";

const Home = () => {
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
        <div className="h-full w-full px-[1rem] pb-[2rem] pt-[10rem]">
          <MainRow rowID="One" />
          <Row title="Family" fetchURL={requests.requestFamily} rowID="Two" />
          <Movie />
          <Row
            title="Thriller"
            fetchURL={requests.requestThriller}
            rowID="Three"
          />
          <Row title="Action" fetchURL={requests.requestAction} rowID="Four" />
          <Row
            title="Romance"
            fetchURL={requests.requestRomance}
            rowID="Five"
          />
          <Movie />
          <Footer />
        </div>
        <MiddleColumn />
      </div>
    </>
  );
};

export default Home;
