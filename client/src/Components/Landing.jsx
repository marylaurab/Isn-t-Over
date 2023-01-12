import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import style from "../cssComponents/landing.module.css";
const slides = ["game1.png", "game2.png", "game3.png"];

export default function Landing() {
  const [currentIndex, setCurrenteIndex] = useState(0);
  const [flag, setFlag] = useState(false);
  const idSetTimeOut = useRef(null);

  function timer() {
    idSetTimeOut.current = setTimeout(() => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrenteIndex(newIndex);
    }, 5000);
  }

  useEffect(() => {
    clearTimeout(idSetTimeOut.current);
    timer();
    return () => {
      clearTimeout(idSetTimeOut.current);
    };
  }, [currentIndex]);

  const slide = {
    height: "100%",
    width: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const goToNext = () => {
  
    console.log("click a Next");
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrenteIndex(newIndex);
  };

  const goToPrevious = () => {


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
        <div
          className={style.slider}
        >
          <div className={style.rightArrow} onClick={() => goToNext()}>
            {">"}
          </div>
          <div className={style.leftArrow} onClick={() => goToPrevious()}>
            {"<"}
          </div>
          <img style={slide} src={`${slides[currentIndex]}`} />
        </div>
      </div>
      <div>
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

