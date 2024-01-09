import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-white border-t border-gray-500 flex flex-col items-center py-[2rem] gap-[1rem]">
      <FaGithub size={50} />
      <p className="text-[.75rem]">Made by Torrey in 2024</p>
    </div>
  );
};

export default Footer;
