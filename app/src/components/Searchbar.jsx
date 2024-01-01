import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";

const Searchbar = ({ toggleDropdown, isActive }) => {
  return (
    <>
      <div className={`dropdown-content ${isActive ? "active" : ""} md:hidden`}>
        <div className="bg-white py-[2rem] w-full flex justify-center gap-4">
          <input
            type="text"
            placeholder="Search Movies"
            className="w-[70%] h-[2rem] outline-none rounded-full bg-gray-50 px-[1rem] py-[1.5rem]"
          />
          <button>
            <IoMdSearch className="w-[1.5rem] h-auto" />
          </button>
        </div>
        <button className="text-black" onClick={toggleDropdown}>
          <IoMdClose className="w-[1.5rem] h-auto" />
        </button>
      </div>
    </>
  );
};

export default Searchbar;
