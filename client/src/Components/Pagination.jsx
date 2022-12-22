import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  prevPage,
  nxtPage,
  specificPage,
  prevSubPages,
  nxtSubPages,
  setSubPages,
} from "../Redux/actions/index";
export default function Pagination({ currentPage, totalPagesToRender }) {
  const dispatch = useDispatch();
  const currentSubPage = useSelector((state) => state.currentSubPage);
  const indexes = useSelector((state) => state.indexes);
  const conditional = useSelector((state) => state.conditional);
  const renderSubPages = useSelector((state) => state.renderSubPages);
  useEffect(() => {
    dispatch(setSubPages());
  }, [indexes]);

  const previosPage = () => {
    if (currentPage === 1) return;
    dispatch(prevPage());
  };
  const nextPage = () => {
    if (currentPage === totalPagesToRender) return;
    dispatch(nxtPage());
  };
  const onSpecificPage = (page) => {
    dispatch(specificPage(page));
  };
  const previousSubPages = () => {
    if (currentSubPage === 1) return;
    dispatch(prevSubPages());
  };
  const nextSubPages = () => {
    if (conditional === currentSubPage) return;
    // if(pages[j + perSubPages]===pages[pages.length-1]) {
    //   setRenderSubPages([
    //     pages[j + perSubPages]
    //   ]);
    //   return;
    // }
    dispatch(nxtSubPages());
  };
  return (
    <div>
      <button onClick={previousSubPages}>{"<<"}</button>
      <button onClick={previosPage}>Prev</button>
      <ul>
        {renderSubPages.map((p) => (
          <li key={p}>
            <button onClick={() => onSpecificPage(p)} key={p}>
              {p}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={nextPage}>Next</button>
      <button onClick={nextSubPages}>{">>"}</button>
    </div>
  );
}
