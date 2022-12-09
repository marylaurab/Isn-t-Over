const { Router } = require("express");
const { getAllGenres } = require("../controllers.js/genreController.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const allGenres = await getAllGenres();
    res.json(allGenres);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
