//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
const moment = require("moment");

//internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./routers/loginRouter");
const usersRouter = require("./routers/usersRouter");
const inboxRouter = require("./routers/inboxRouter");

const app = express();
const server = http.createServer(app);
dotenv.config();

// socket creation
const io = require("socket.io")(server);
global.io = io;

//set comment as app locals
app.locals.moment = moment;

//database connection
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, options)
  .then(() => {
    console.log("Connected to Database");
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
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

//404 not found error handler
app.use(notFoundHandler);

//default error handler
app.use(errorHandler);

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
