import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "../cssComponents/landing.module.css";
const slides = ["game1.png", "game2.png", "game3.png"];

export default function Landing() {
  const [currentIndex, setCurrenteIndex] = useState(0);
  const [flag, setFlag] = useState(true);

 
  // setTimeout(() => {
  //   if (flag) {
  //     const isLastSlide = currentIndex === slides.length - 1;
  //     const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //     setCurrenteIndex(newIndex);
  //   } else {
  //     return;
  //   }
  // }, 5000);


  const slide = {
    height: "100%",
    width: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const goToNext = () => {
    setFlag(false);
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrenteIndex(newIndex);
    
  };

  const goToPrevious = () => {
    setFlag(false);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrenteIndex(newIndex);
   
  };

  return (
    <div className={style.background}>
      <div className={style.header}>
        <img src="logoPI1.png" alt="Logo img" className={style.logo} />
      </div>
      <div className={style.container}>
        <div className={style.slider} onMouseLeave={()=>setFlag(true)}>
          <div className={style.rightArrow} onClick={goToNext}>
            {">"}
          </div>
          <div className={style.leftArrow} onClick={goToPrevious}>
            {"<"}
          </div>
          <img style={slide} src={`${slides[currentIndex]}`} />
        </div>
        <div className={style.divButtons}>
          <Link to="/videogames">
            <button className={style.buttons}>view all games</button>
          </Link>

          <Link to="/creategame">
            <button className={style.buttons}>post my game</button>
          </Link>
        </div>
      </div>
    </div>
  );
}


// PARA SOLUCIONAR EL SETTIMEOUT:
// import React, { useEffect, useRef, useState } from "react"

// const Timer = () => {
//   const [message, setMessage] = useState("Timer Running")
//   // reference used so that it does not change across renders
//   let timeoutID = useRef(null)
//   useEffect(() => {
//     timeoutID.current = setTimeout(() => {
//       setMessage("Times Up!")
//     }, 5000)

//     return () => {
//       clearTimeout(timeoutID.current)
//       console.log("timeout cleared")
//     }
//   }, [])
//   return <div>{message}</div>
// }

// const Timeout = () => {
//   const [showTimer, setShowTimer] = useState(false)
//   return (
//     <div>
//       <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
//       <div>{showTimer && <Timer />}</div>
//     </div>
//   )
// }

// export default Timeout