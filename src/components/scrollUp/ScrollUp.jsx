"use client";
import { useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollUp = () => {
  const [scrollUp, setScrollUp] = useState(false);

  const upArrow = () => {
    if (window.scrollY >= 100) {
      setScrollUp(true);
    } else {
      setScrollUp(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", upArrow);
  
    return () => {
      window.removeEventListener("scroll", upArrow);
    }
  }, [])
  

  return (
    <>
      {scrollUp && (
        <i className="fixed right-3 bottom-3 cursor-pointer" onClick={handleClick}>
          <FaArrowAltCircleUp  className=" bg-slate-100  w-12 h-12 rounded-full sm:w-10 sm:h-10"/>
        </i>
      )}
    </>
  );
};

export default ScrollUp;
