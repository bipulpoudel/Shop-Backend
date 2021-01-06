const express = require("express");
const connectDB = require("./config/db");
//middlewares imports
const { middlewaresConfig } = require("./app/middlewares");

const app = express();

// Init Middleware
middlewaresConfig(app);

// Connect Database
connectDB();

//Routes
app.use("/category", require("./app/routes/category"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
