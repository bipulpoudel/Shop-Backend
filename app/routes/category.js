const express = require("express");
const routes = express.Router();

const { fetchCategories, addCategories } = require("../controllers/category");

//Get all the categories
routes.get("/fetch", fetchCategories);

routes.post("/add", addCategories);

module.exports = routes;
