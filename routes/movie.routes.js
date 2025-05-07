const router = require("express").Router();
const movieController = require("../controllers/movie.controller");

router.get("/", movieController.findAllMovies);
router.get("/:id", movieController.findMovieById);
router.get("/:id/shows", movieController.findShows);

module.exports = router;
