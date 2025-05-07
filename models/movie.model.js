const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  theatre: {
    type: {
      name: { type: String, required: true },
      city: { type: String, required: true },
    },
    required: true,
  },
  language: { type: String, required: true },
  show_timing: { type: String, required: true },
  available_seats: { type: Number, required: true },
  unit_price: { type: Number, required: true },
});

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    released: {
      type: Boolean,
      required: true,
    },
    poster_url: {
      type: String,
      required: true,
      unique: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    publish_date: {
      type: String,
      required: true,
    },
    genres: {
      type: [String],
      required: true,
      enum: [
        "action",
        "adventure",
        "animation",
        "biography",
        "comedy",
        "crime",
        "drama",
        "fantasy",
        "historical",
        "horror",
        "musical",
        "mystery",
        "romance",
        "sci-fi",
        "sport",
        "thriller",
      ],
    },
    artists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],
    shows: {
      type: [showSchema],
      default: [],
      required: false,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
