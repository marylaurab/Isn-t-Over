import { useState } from "react";

export default function Pagination({
  perPage,
  totalGames,
  setCurrentPage,
  currentPage,
}) {
  const [limitsToRender, setLimitsToRender] = useState({
    minLimit: 0,
    maxLimit: 3,
  });
  const [perLimit, setPerLimit] = useState(3);
  const [currentLimit, setCurrentLimit] = useState(1);
  const totalPagesToRender = Math.ceil(totalGames / perPage);
  const conditional = Math.ceil(totalPagesToRender / perLimit);
  const pages = [];

  for (let i = 1; i <= totalPagesToRender; i++) {
    pages.push(i);
  }
  const previosPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage === totalPagesToRender) return;
    setCurrentPage(currentPage + 1);
  };
  const onSpecificPage = (page) => {
    setCurrentPage(page);
  };
  const previousLimit = () => {
    if (currentLimit === 1) return;
    setLimitsToRender(
      (limitsToRender.minLimit = limitsToRender.minLimit - 3,
        limitsToRender.maxLimit = limitsToRender.maxLimit - 3)
    );
    setCurrentLimit(currentLimit-1)
  };
  const nextLimit = () => {
    if (conditional === currentLimit) return;
    setLimitsToRender(
      (limitsToRender.minLimit = limitsToRender.minLimit + 3,
      limitsToRender.maxLimit = limitsToRender.maxLimit + 3)
    );
    setCurrentLimit(currentLimit+1)
  };
  return (
    <div>
      <button onClick={previousLimit}>{"<<"}</button>
      <button onClick={previosPage}>Prev</button>
      <ul>
        {pages
          .slice(limitsToRender.minLimit, limitsToRender.maxLimit)
          .map((p) => (
            <li key={p}>
              <button onClick={() => onSpecificPage(p)}>{p}</button>
            </li>
          ))}
      </ul>
      <button onClick={nextPage}>Next</button>
      <button onClick={nextLimit}>{">>"}</button>
    </div>
  );
}
