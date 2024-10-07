const httpStatus = require("http-status");
const createError = require("http-errors");

const getUsers = (req, res, next) => {
  try {
    res
      .status(httpStatus.OK)
      .json({ success: true, message: "Users are here" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
