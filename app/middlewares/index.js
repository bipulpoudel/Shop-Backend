const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const middlewaresConfig = (app) => {
  //TODO: make morgan common for production
  app.use(morgan("dev"));
  app.use(express.json({ extended: false }));
  app.use(cors());
};

module.exports = { middlewaresConfig };
