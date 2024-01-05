import React from "react";
import { IoMdClose } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";

const Searchbar = ({ toggleDropdown, isActive }) => {
  return (
    <>
      <div
        className={`dropdown-content ${
          isActive ? "active" : ""
        } lg:hidden z-[51] md:px-[8rem] px-[1rem]`}
      >
        <div className="py-[2rem] w-[100%] flex justify-center gap-4 text-white">
          <input
            type="text"
            placeholder="Search Movies"
            className="w-[70%] h-[2rem] outline-none rounded-full bg-gray-800 text-white px-[1rem] py-[1.5rem]"
          />
          <button>
            <IoMdSearch className="w-[1.5rem] h-auto" />
          </button>
        </div>
        <button className="bg-black text-white" onClick={toggleDropdown}>
          <IoMdClose className="w-[1.5rem] h-auto" />
        </button>
      </div>
    </>
  );
};

export default Searchbar;
