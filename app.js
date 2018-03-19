require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { itemSearch, itemLookup } = require("./apacLookup");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get("/list", (req, res, next) => {
  // console.log("req.query", req.query);
  itemSearch(req.query)
    .then(data => res.json(data))
    .catch(next);
});

app.get("/item", (req, res, next) => {
  // console.log("req.query", req.query);
  itemLookup(req.query)
    .then(data => res.json(data))
    .catch(next);
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: req.app.get("env") === "development" ? err.stack : {},
  });
});

module.exports = app;
