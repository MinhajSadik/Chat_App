//external imports
const express = require("express");

//internal imports
const { getUsers, addUser } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avaterUpload = require("../middlewares/users/avaterUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidator");

const router = express.Router();

//login page

router.get("/", decorateHtmlResponse("Users"), getUsers);
router.post(
  "/",
  avaterUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

module.exports = router;
