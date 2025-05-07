const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB", connection.connection.host);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
