import React, { useState } from "react";
import Searchbar from "./Searchbar";

import { BiSolidMoviePlay } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";

const Navbar = ({ toggleDropdown, isActive }) => {
  return (
    <>
      <div className="flex justify-between py-[1.5rem] gap-[4rem]">
        <BiSolidMoviePlay className="w-[3rem] h-auto cursor-pointer" />

        <div className="w-[100%] hidden md:flex">
          <input className="rounded-full w-[100%] px-[1rem] text-xl outline-none" />
          <button className="p-2">
            <IoMdSearch className="w-[2rem] h-auto" />
          </button>
        </div>

        <button className="md:hidden" onClick={toggleDropdown}>
          <IoMdSearch className="w-[2rem] h-auto" />
        </button>
      </div>
    </>
  );
};

export default Navbar;
