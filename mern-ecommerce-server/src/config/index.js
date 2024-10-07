require("dotenv").config();

// database
const mongodbURL = process.env.MONGODB_URL;

// utils
const serverPort = process.env.SERVER_PORT || 5000;

module.exports = {
  mongodbURL,
  serverPort,
};
