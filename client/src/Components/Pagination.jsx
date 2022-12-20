import { useState } from "react";

export default function Pagination({
  perPage,
  totalGames,
  setCurrentPage,
  currentPage,
}) {
  const [perSubPages, setPerSubPages] = useState(3);
  const totalPagesToRender = Math.ceil(totalGames / perPage);
  const conditional = Math.ceil(totalPagesToRender / perSubPages);
  const pages = [];
  
  for (let i = 1; i <= totalPagesToRender; i++) {
    pages.push(i);
  }
  
  const [currentSubPage, setCurrentSubPage] = useState(1);
  let j = 0;
  let k = 1;
  let l = 2;
  const minLimit = 0;
  const maxLimit = 3;
  const [renderSubPages, setRenderSubPages] = useState([
    pages[j],
    pages[k],
    pages[l],
  ]);

  const previosPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage > totalPagesToRender) return;
    setCurrentPage(currentPage + 1);
  };
  const onSpecificPage = (page) => {
    setCurrentPage(page);
  };
  const previousSubPages = () => {
    if (currentSubPage === 1) return;
    setRenderSubPages([
      pages[j - perSubPages],
      pages[k - perSubPages],
      pages[l - perSubPages],
    ]);
    setCurrentSubPage(currentSubPage - 1);
  };
  const nextSubPages = () => {
    if (conditional === currentSubPage) return;
    if(pages[j + perSubPages]===pages[pages.length-1]) {
      setRenderSubPages([
        pages[j + perSubPages]
      ]); 
      return; 
    }
    setRenderSubPages([
      pages[j + perSubPages],
      pages[k + perSubPages],
      pages[l + perSubPages],
    ]);
    setCurrentSubPage(currentSubPage + 1);
  };
  return (
    <div>
      <button onClick={previousSubPages}>{"<<"}</button>
      <button onClick={previosPage}>Prev</button>
      <ul>
        {renderSubPages.slice(minLimit, maxLimit).map((p) => (
          <li key={p}>
            <button onClick={() => onSpecificPage(p)} key={p}>{p}</button>
          </li>
        ))}
      </ul>
      <button onClick={nextPage}>Next</button>
      <button onClick={nextSubPages}>{">>"}</button>
    </div>
  );
}
