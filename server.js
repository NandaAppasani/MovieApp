const express = require("express");
const cors = require("cors");
require("dotenv").config();
const moviesRouter = require("./routes/movie.routes");
const userRouter = require("./routes/user.routes");
const artistsRouter = require("./routes/artist.routes");
const genreRouter = require("./routes/genre.routes");
const connectDb = require("./config/db.config");

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Movie booking backend is running!");
});

app.use("/movies", moviesRouter);
app.use("/auth", userRouter);
app.use("/artists", artistsRouter);
app.use("/genres", genreRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

connectDb();

module.exports = app;
