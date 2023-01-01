const titleAsc = function (m, n) {
  let titleM = m.title.toLowerCase();
  let titleN = n.title.toLowerCase();
  if (titleM > titleN) return 1;
  if (titleN > titleM) return -1;
  return 0;
};

const titleDes = function (m, n) {
  let titleM = m.title.toLowerCase();
  let titleN = n.title.toLowerCase();
  if (titleM < titleN) return 1;
  if (titleN < titleM) return -1;
  return 0;
};

const ratingAsc = function (m, n) {
  let ratingM = m.rating;
  let ratingN = n.rating;
  if (ratingM > ratingN) return -1;
  if (ratingN > ratingM) return 1;
  return 0;
};
const ratingDes = function (m, n) {
  let ratingM = m.rating;
  let ratingN = n.rating;
  if (ratingM < ratingN) return -1;
  if (ratingN < ratingM) return 1;
  return 0;
};

export const filteringByGenres = function (obj, nameGenre) {
  if (obj.genres.includes(nameGenre)) {
    return true;
  } else {
    return false;
  }
};

export const filteringByCreated = function (obj) {
  if (obj.hasOwnProperty("createDb")) {
    return true;
  } else {
    return false;
  }
};

export const directoryOrderApplied = [
  { name: "A>Z", sortToApply: titleAsc },
  { name: "Z>A", sortToApply: titleDes },
  { name: "GREATEST RATING", sortToApply: ratingAsc },
  { name: "LEAST RATING", sortToApply: ratingDes },
  { name: "NO ORDER", sortToApply: null },
];
//en order_by en su action, buscare el directoryOrderA y directoryOrderNA, uno para uasar cuando no se no order y otro para cuando si sea y hayan condicionales
export const directoryOrderNoApplied = [
  {
    id: 1,
    orderValue: "NO ORDER",
    filterByGenreApplied: false,
    filterByCreationApplied: false,
  },

  {
    id: 2,
    orderValue: "NO ORDER",
    filterByGenreApplied: true,
    filterByCreationApplied: false,
  },

  {
    id: 3,
    orderValue: "NO ORDER",
    filterByGenreApplied: false,
    filterByCreationApplied: true,
  },

  {
    id: 4,
    orderValue: "NO ORDER",
    filterByGenreApplied: true,
    filterByCreationApplied: true,
  },
];
export const filteringOrderDirectory = function (
  obj,
  orderValue,
  filterByGenreApplied,
  filterByCreationApplied
) {
  if (
    obj.orderValue === orderValue &&
    obj.filterByGenreApplied === filterByGenreApplied &&
    obj.filterByCreationApplied === filterByCreationApplied
  ) {
    return true;
  } else {
    return false;
  }
};
export const directoryByGenre = [
  {
    id: 1,
    name: "someGenre",
    orderApplied: false,
    filterByCreationApplied: false,
  },
  {
    id: 2,
    name: "someGenre",
    orderApplied: true,
    filterByCreationApplied: false,
  },
  {
    id: 3,
    name: "someGenre",
    orderApplied: false,
    filterByCreationApplied: true,
  },
  {
    id: 4,
    name: "someGenre",
    orderApplied: true,
    filterByCreationApplied: true,
  },

  {
    id: 5, ///opuesto a 1
    name: "NO FILTER",
    orderApplied: false,
    filterByCreationApplied: false,
  },
  {
    id: 6, //opuesto 2
    name: "NO FILTER",

    orderApplied: true,
    filterByCreationApplied: false,
  },

  {
    id: 7, //opuesto a 3
    name: "NO FILTER",
    orderApplied: false,
    filterByCreationApplied: true,
  },
  {
    id: 8, //opuesto a 4
    name: "NO FILTER",
    orderApplied: true,
    filterByCreationApplied: true,
  },
];

export const filteringGenreDirectory = (
  obj,
  genre,
  // inputForSearch,
  orderApplied,
  filterByCreationApplied
) => {
  if (
    genre !== "NO FILTER" &&
    obj.name !== "NO FILTER" &&
    orderApplied === obj.orderApplied &&
    filterByCreationApplied === obj.filterByCreationApplied
  ) {
    return true;
  } else if (
    genre === obj.name &&
    orderApplied === obj.orderApplied &&
    filterByCreationApplied === obj.filterByCreationApplied
  ) {
    return true;
  } else {
    return false;
  }
};

export const directoryByCreationNoApplied = [
  {
    id: 1,
    name: "NO FILTER",
    orderApplied: false,
    filterByGenreApplied: false,
  },
  {
    id: 2,
    name: "NO FILTER",
    orderApplied: false,
    filterByGenreApplied: true,
  },
  {
    id: 3,
    name: "NO FILTER",
    orderApplied: true,
    filterByGenreApplied: false,
  },
  {
    id: 4,
    name: "NO FILTER",
    orderApplied: true,
    filterByGenreApplied: true,
  },
];

export const filteringCreationDirectory = (
  obj,
  created,
  orderApplied,
  filterByGenreApplied
) => {
  if (
    obj.name === created &&
    obj.orderApplied === orderApplied &&
    obj.filterByGenreApplied === filterByGenreApplied
  ) {
    return true;
  } else {
    return false;
  }
};
