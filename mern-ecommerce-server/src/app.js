const express = require("express");
const morgan = require("morgan");
const httpStatus = require("http-status");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const { routes } = require("./routes");

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 15 requests per windowMs
  handler: function (req, res, next) {
    res.status(httpStatus.TOO_MANY_REQUESTS).json({
      success: false,
      message: "Too many requests from this IP, please try again later...",
    });
  },
});

// middlewares
app.use(morgan("dev"));
app.use(xssClean());
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", routes);
app.get("/", (req, res) => {
  res
    .status(httpStatus.OK)
    .json({ success: true, message: "Server is up and running..." });
});

// client error handler
app.use((req, res, next) => {
  next(createError(httpStatus.NOT_FOUND, "Not Found"));
});

// server error handler
app.use((err, req, res, next) => {
  return res
    .status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: err.message });
});

module.exports = app;
