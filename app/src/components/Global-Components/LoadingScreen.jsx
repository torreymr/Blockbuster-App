// LoadingScreen.js
import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? "" : prevDots + "."));
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loading-screen">
      <h2>{dots}</h2>
    </div>
  );
};

export default LoadingScreen;
