const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

//database connection
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, options)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });

//request parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup

//error handler

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
