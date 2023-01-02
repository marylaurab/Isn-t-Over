const { Router } = require("express");
const router = Router();

const { getAllPlatforms } = require("../controllers.js/platformController");

router.get("/", async (req, res) => {
  try {
    const foundPlatforms = await getAllPlatforms();
    res.json(foundPlatforms);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;