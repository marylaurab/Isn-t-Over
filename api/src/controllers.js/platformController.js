const fetch = require("node-fetch");

const getAllPlatforms = async () => {
  let allPlatforms = [];
  for (let i = 1; i < 3; i++) {
    await fetch(
      `https://api.rawg.io/api/platforms?key=0bf28af6c8e545f1a7f19fcbaa63d25e&page=${i}`
    )
      .then((response) => response.json())
      .then((json) => json.results?.map((p) => allPlatforms.push(p.name)));
  }

  return allPlatforms;
};


module.exports = {
  getAllPlatforms,
};
