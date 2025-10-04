import React, { useState } from "react";
import Balloons from "./Balloons";
import SimpleLetter from "./LetterPaper";
import promise from "./assets/promise.png";
import heart from "./assets/heart2.png";
const App = () => {
  const [showLetter, setShowLetter] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpenLetter = () => {
    setIsAnimating(true);
    setShowLetter(true);
  };

  const handleCloseLetter = (e) => {
    if (e.target.classList.contains("letter-overlay")) {
      setIsAnimating(false);
      setShowLetter(false);
    }
  };

  return (
    <div className="relative">
      {/* Background elements */}
      <div
        className={`transition-all duration-1000 ${
          showLetter ? "filter blur-md scale-105" : ""
        }`}
      >
        <div className="hbd"></div>
        <div className="lovebg"></div>
        <div className="lovebg2"></div>

        {/* Last background with the button positioned on it */}
        <div className="loveletter relative">
          <img
            className="h-[180px] absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-[295px] ml-5"
            src={heart}
            alt=""
          />
          <img
            className="h-[180px] absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-[190px] "
            src={promise}
            alt=""
          />
          <button
            id="heart"
            onClick={handleOpenLetter}
            className="button absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-[100px] "
          >
            <a
              className="group relative inline-block text-sm font-medium text-white focus:ring-3 focus:outline-hidden "
              href="#"
            >
              <span className="absolute inset-0 border border-red-600 rounded-[5px]"></span>
              <span className="rounded-[5px] block border border-red-600 bg-red-600 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                ♡ تا ابد
              </span>
            </a>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill={"#ff0088"}
            viewBox="0 0 24 24"
          ></svg>
        </div>
      </div>

      {/* Letter Overlay with proper slow animation */}
      {showLetter && (
        <div
          className={`letter-overlay fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center z-50 transition-all duration-1000 ${
            isAnimating ? "bg-opacity-60" : ""
          }`}
          onClick={handleCloseLetter}
        >
          <div
            className={`transform transition-all duration-1000 ${
              isAnimating ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <SimpleLetter />
            <button
              onClick={() => {
                setIsAnimating(false);
                setTimeout(() => setShowLetter(false), 300);
              }}
              className="absolute -top-3 -right-3 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-60 font-bold text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Balloons />
    </div>
  );
};

export default App;
