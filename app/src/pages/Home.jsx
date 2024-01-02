import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Searchbar from "../components/Searchbar.jsx";
import MainRow from "../components/MainRow.jsx";
import Movie from "../components/Movie.jsx";

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
      <div className="background-color min-h-[100vh] px-[1rem]">
        <Navbar toggleDropdown={toggleDropdown} />
        <MainRow />
        <Movie />
      </div>
    </>
  );
};

export default Home;
