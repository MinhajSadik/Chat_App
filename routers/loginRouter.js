//external imports
const express = require("express");
const router = express.Router();

//internal imports
const { getLogin, login } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidationHandler,
  doLoginValidators,
} = require("../middlewares/login/loginValidator");

const page_title = "Login";

//login page
router.get("/", decorateHtmlResponse(page_title), getLogin);

//do login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

module.exports = router;
