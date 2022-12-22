import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  prevPage,
  nxtPage,
  specificPage,
  prevSubPages,
  nxtSubPages,
  setSubPages,
  setNextPivot,
  setPrevPivot
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
    if (currentPage === renderSubPages[0]) {
      dispatch(prevSubPages());
      dispatch(setPrevPivot())
      return;
    }
    dispatch(prevPage());
  };
  const nextPage = () => {
    if (currentPage === totalPagesToRender) return;
    if (currentPage === renderSubPages[renderSubPages.length - 1]) {
      dispatch(nxtSubPages()); //puede q esto tenga q ser otra funcion q haga lo mismo + cambiar el currentpage
      dispatch(setNextPivot())
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
    dispatch(setNextPivot())
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
    dispatch(setNextPivot())
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
