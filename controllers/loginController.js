const User = require("../models/People");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const res = require("express/lib/response");

//get login page
function getLogin(req, res, next) {
  res.render("index");
}

//do login
async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
      if(user && user._id){
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordValid){
          const userObject = {
            username: user.name,
            mobile: user.mobile,
            email: user.email,
            role: "user",
          }
          const token = jwt.sign(userObject, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
          res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true, maxAge: process.env.JWT_EXPIRY, signed: true });
          res.locals.loggedInUser = userObject;
          res.render('inbox');
        }else{
          throw createError("login failed! please try again.")
        }
      }else{
        throw createError("login failed! please try again.")
      }
    });
  } catch (err) {
    res.render("index", {
      data:{
        username: req.body.username,

      }
      errors: {
        common: {
          msg: err.message,
        }
      }
    });
  }
}

module.exports = {
  getLogin,
  login
};
