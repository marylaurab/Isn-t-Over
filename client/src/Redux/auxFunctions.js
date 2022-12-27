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

const filteringByCreated = function (obj) {
  if (obj.hasOwnProperty("createDb")) {
    return true;
  } else {
    return false;
  }
};

const filteringByExisting = function (obj) {
  if (!obj.hasOwnProperty("createDb")) {
    return true;
  } else {
    return false;
  }
};

export const directoryOrder = [
  { name: "A>Z", sortToApply: titleAsc },
  { name: "Z>A", sortToApply: titleDes },
  { name: "GREATEST RATING", sortToApply: ratingAsc },
  { name: "LEAST RATING", sortToApply: ratingDes },
  { name: "NO ORDER", sortToApply: null },
];

export const directoryFilter = [
  { name: "CREATED", filterToApply: filteringByCreated },
  { name: "EXISTING", filterToApply: filteringByExisting },
  { name: "NO ORDER", filterToApply: null },
];
