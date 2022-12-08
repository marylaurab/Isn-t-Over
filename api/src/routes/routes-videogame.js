const { Router } = require("express");
const router = Router();
const {
  getAllGames,
  getAllByName,
  getGameById,
  createVideogame,
} = require("../controllers.js/videogController.js");

router.get("/", async (req, res) => {
  const {nameGame}=req.query;
  try {
    if(nameGame) {
      const gamesByName=await getAllByName(nameGame)
      return res.json(gamesByName);
    }
    const videogames = await getAllGames();
    res.json(videogames);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const gameById = await getGameById(id);
    res.json(gameById);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports = router;
