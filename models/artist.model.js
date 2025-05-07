const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    wiki_url: {
      type: String,
      required: true,
      unique: true,
    },
    profile_url: {
      type: String,
      required: true,
      unique: true,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
