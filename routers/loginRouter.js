//external imports
const express = require("express");
const router = express.Router();

//internal imports
const { getLogin } = require("../controllers/loginController");

//login page

router.get("/", getLogin);

module.exports = router;
