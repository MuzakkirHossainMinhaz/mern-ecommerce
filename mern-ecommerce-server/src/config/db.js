const mongoose = require("mongoose");
const { mongodbURL } = require(".");

const connectToDatabase = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log("Database connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
      process.exit(1);
    });
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
