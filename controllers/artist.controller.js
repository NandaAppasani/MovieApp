const errorHandler = require("../middleware/errorHandler");
const artistService = require("./../services/artist.service");

const getAllArtists = async (req, res) => {
  try {
    const artists = await artistService.findAllArtists();
    res.status(200).json({
      data: artists,
      message: "Data retrieved successfully",
    });
  } catch (err) {
    errorHandler(500, "Internal server error")(err, req, res);
  }
};

module.exports = {
  getAllArtists,
};
