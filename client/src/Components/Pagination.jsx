import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setSubPages,
  prevSubPages,
  setPrevPivot,
  nxtSubPages,
  setNextPivot,
  nxtPage,
  specificPage,
  prevPage,
} from "../Redux/actions/pages";
import style from "../cssComponents/pagination.module.css";

export default function Pagination({ currentPage, totalPagesToRender }) {
  const dispatch = useDispatch();

  const currentSubPage = useSelector((state) => state.paginate.currentSubPage);
  const indexes = useSelector((state) => state.paginate.indexes);
  const conditional = useSelector((state) => state.paginate.conditional);
  const renderSubPages = useSelector((state) => state.paginate.renderSubPages);
  const pages = useSelector((state) => state.paginate.pages);

  useEffect(() => {
    dispatch(setSubPages());
   }, //[indexes]
   [currentPage]);

  const previosPage = () => {
    if (currentPage === 1) return;
    if (currentPage === renderSubPages[0]) {
      
      dispatch(prevSubPages());
      dispatch(setPrevPivot());
      return;
    }
   
    dispatch(prevPage());
  };
  const nextPage = () => {
    if (currentPage === totalPagesToRender) return;
    if (currentPage === renderSubPages[renderSubPages.length - 1]) {
      dispatch(nxtSubPages());
      dispatch(setNextPivot());
      return;
    }
    dispatch(nxtPage());
  };
  const onSpecificPage = (page) => {
    dispatch(specificPage(page));
  };
  const previousSubPages = () => {
    if (currentSubPage === 1) return;
   
    dispatch(prevSubPages());
    dispatch(setNextPivot());
  };
  const nextSubPages = () => {
    if (conditional === currentSubPage) return;
    dispatch(nxtSubPages());
    dispatch(setNextPivot());
  };

  return (
    <div className={style.container}>
      <div className={style.mainDiv}>
        <div className={style.divButtons}>
          <button
            
            onClick={previousSubPages} 
            className={
              currentSubPage === 1 ? style.disabledButtons : style.buttons
            }
          >
            {"<<"}
          </button>
          <button
            
            onClick={previosPage}
            className={
              currentPage === 1 ? style.disabledButtons : style.buttons
            }
          >
            Prev
          </button>
        </div>
        {currentPage > 3 ? <h5 className={style.dotsPrev}>...</h5> : undefined}
        <div>
          <ul className={style.divSubPages}>
            {renderSubPages.map((p) => (
              <li key={p}>
                <button
                  onClick={() => onSpecificPage(p)}
                  key={p}
                  className={
                    p === currentPage ? style.currentPage : style.subPages
                  }
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {currentPage !== totalPagesToRender ? (
          <h5 className={style.dotsNext}>...</h5>
        ) : undefined}
        <div className={style.divButtons}>
          <button
            onClick={nextPage}
            className={
              currentPage === pages.length
                ? style.disabledButtons
                : style.buttons
            }
          >
            Next
          </button>
          <button
            onClick={nextSubPages}
            className={
              currentSubPage === conditional
                ? style.disabledButtons
                : style.buttons
            }
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
