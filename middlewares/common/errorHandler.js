const createError = require("http-errors");
//404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "your requested page was not found"));
}

//default error handler
function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };
  if (res.locals.html) {
    //html response
    res.render("error", {
      message: err.message,
      error: err,
    });
  } else {
    //json response
    res.json(res.locals.error);
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
