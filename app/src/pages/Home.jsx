import React, { useState } from "react";
import Navbar from "../components/Global-Components/Navbar.jsx";
import Searchbar from "../components/Global-Components/Mobile searchbar.jsx";

import Row from "../components/Home-Page-Components/Row.jsx";
import Footer from "../components/Global-Components/Footer.jsx";
import Main from "../components/Home-Page-Components/Main.jsx";

const Home = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <div className="h-full w-full background-color min-h-[100vh] md:px-[8rem] px-[1rem] pb-[2rem] pt-[8rem] flex flex-col gap-4">
        {isDropdownVisible && (
          <Searchbar
            toggleDropdown={toggleDropdown}
            isActive={isDropdownVisible}
          />
        )}
        <Navbar toggleDropdown={toggleDropdown} />
        <Main />
        <Row type="popular" rowID="one" title="Popular" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
