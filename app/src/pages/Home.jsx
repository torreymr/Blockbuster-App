import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Searchbar from "../components/Searchbar.jsx";
import Main from "../components/Main.jsx";

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
      <div className="bg-gradient-to-t from-[#fdfbfb] to-[#ebedee] h-[100vh] px-[8%] md:px-[10%]">
        <Navbar toggleDropdown={toggleDropdown} />
        <Main />
      </div>
    </>
  );
};

export default Home;
