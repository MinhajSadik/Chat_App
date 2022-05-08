//external imports
const express = require("express");
const router = express.Router();

//internal imports
const { getLogin, login, logout } = require("../controllers/loginController");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidationHandler,
  doLoginValidators,
} = require("../middlewares/login/loginValidator");

const page_title = "Login";

//login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

//do login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

router.delete("/", logout);

module.exports = router;
