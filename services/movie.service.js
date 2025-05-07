const Movie = require("../models/movie.model");

const findAllMovies = async (filters = {}) => {
  const movies = await Movie.find(filters);
  return movies;
};

const findMovieById = async (id) => {
  return await Movie.findById(id);
};

const findAllShows = async (id) => {
  const shows = await Movie.findById(id).select("shows");
  return shows;
};

module.exports = {
  findAllMovies,
  findMovieById,
  findAllShows,
};
