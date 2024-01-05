import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Searchbar from "../components/Searchbar.jsx";

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
        <div className="h-full w-full md:px-[8rem] px-[1rem] pb-[2rem] pt-[8rem]">
          <Row title="Popular" fetchURL={requests.requestPopular} rowID="One" />
          <Row
            title="Top Rated"
            fetchURL={requests.requestTopRated}
            rowID="Two"
          />
          <Movie />
          <Row
            title="Trending"
            fetchURL={requests.requestTrending}
            rowID="Three"
          />
          <Row
            title="Upcoming"
            fetchURL={requests.requestUpcoming}
            rowID="Four"
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
