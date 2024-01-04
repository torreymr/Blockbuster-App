import React from "react";

import { BiSolidMoviePlay } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";

const Navbar = ({ toggleDropdown, isActive }) => {
  return (
    <>
      <div className="flex justify-between items-center py-[1.5rem] gap-[4rem] text-gray-200 px-[3%] md:px-[5%] border-b-2 border-gray-800 fixed top-0 left-0 w-full background-color z-50">
        <div className="w-[5rem] flex flex-col items-center text-center  cursor-pointer">
          <BiSolidMoviePlay className="w-[3rem] h-auto" />
          <p className="text-wrap text-sm font-bold">WE LOVE MOVIES</p>
        </div>
        <div className="w-[100%] hidden md:flex items-center gap-4">
          <input className="rounded-full w-[100%] h-[2.5rem] px-[1rem] text-xl outline-none bg-gray-800 text-white" />
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
