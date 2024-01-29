import React from "react";
import YouTube from "react-youtube";
import { IoIosClose } from "react-icons/io";

const DesktopTrailerComponent = ({ videoId, onClose }) => {
  const opts = {
    height: "690",
    width: "1080",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80 z-[100]"></div>
      <div className="trailer-wrapper flex">
        <YouTube videoId={videoId} opts={opts} />
        <button onClick={onClose} className="w-12 h-12">
          <IoIosClose className="text-white w-full h-full" />
        </button>
      </div>
    </div>
  );
};

export default DesktopTrailerComponent;
