const errorHandler = require("../middleware/errorHandler");
const genreService = require("./../services/genre.service");

const getAllGenres = async (req, res) => {
  try {
    const genres = await genreService.findAllGenres();
    res.status(200).json({
      data: genres,
      message: "Data retrieved successfully",
    });
  } catch (err) {
    errorHandler(500, "Internal server error")(err, req, res);
  }
};

module.exports = {
  getAllGenres,
};
