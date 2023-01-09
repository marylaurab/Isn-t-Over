import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "../cssComponents/landing.module.css";
const slides = ["game1.png", "game2.png", "game3.png"];

export default function Landing() {
  const [currentIndex, setCurrenteIndex] = useState(0);
  const [flag, setFlag] = useState(true);

  // useEffect(()=>{
  //   timer();
  //   setFlag(false);
  // },[flag===true])

  // const timer = () => {
  setTimeout(() => {
    if (flag) {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrenteIndex(newIndex);
    } else {
      return;
    }
  }, 5000);
  // };

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
    // setFlag(true);
  };

  const goToPrevious = () => {
    setFlag(false);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrenteIndex(newIndex);
    // setFlag(true);
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
