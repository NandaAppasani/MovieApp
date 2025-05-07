const errorHandler = require("../middleware/errorHandler");
const movieService = require("../services/movie.service");

const findAllMovies = async (req, res) => {
  try {
    const { genres, status, artists, release_date, publish_date, title } =
      req.query;
    const filters = {};

    if (genres) {
      const genreList = genres
        .split(",")
        .map((genre) => genre.trim().toLowerCase());
      filters.genres = { $in: genreList };
    }

    if (status) {
      const statusLower = status.trim().toLowerCase();
      if (statusLower === "published") {
        filters.published = true;
      } else if (statusLower === "released") {
        filters.released = true;
      } else {
        return res.status(400).json({
          message: "Invalid status value",
        });
      }
    }

    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }

    if (artists) {
      const artistList = artists
        .split(",")
        .map((artist) => artist.trim().toLowerCase());
      filters["artists.first_name"] = { $in: artistList };
    }

    if (publish_date || release_date) {
      filters.release_date = {};
      if (publish_date) {
        filters.release_date = publish_date;
      }
      if (release_date) {
        filters.release_date = release_date;
      }
    }
    const movies = await movieService.findAllMovies(filters);

    if (!movies || movies.length === 0) {
      return res.status(404).json({
        message: "No movies found",
      });
    }

    return res.status(200).json({
      data: movies,
      message: "Movies list fetched successfully",
    });
  } catch (err) {
    errorHandler(500, "Internal server error")(err, req, res);
  }
};

const findMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.error("Missing ID");
      return res.status(400).json({
        message: "Invalid request, ID is required",
      });
    }
    const movie = await movieService.findMovieById(id);
    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }
    res.status(200).json({
      data: movie,
      message: "Movie fetched successfully",
    });
  } catch (err) {
    errorHandler(500, "Internal server error")(err, req, res);
  }
};

const findShows = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.error("Missing ID");
      return res.status(400).json({
        message: "Invalid request, ID is required",
      });
    }
    const shows = await movieService.findAllShows(id);
    res.status(200).json({
      data: shows || [],
      message: "Movie fetched successfully",
    });
  } catch (err) {
    errorHandler(500, "Internal server error")(err, req, res);
  }
};

module.exports = {
  findAllMovies,
  findMovieById,
  findShows,
};
