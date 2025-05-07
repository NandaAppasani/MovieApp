const Artist = require("./../models/artist.model");

const findAllArtists = async () => {
  return Artist.find();
};

module.exports = {
  findAllArtists,
};
