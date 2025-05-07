const Genre = require("./../models/genre.model");

const findAllGenres = async () => {
  return await Genre.find();
};

module.exports = {
  findAllGenres,
};
