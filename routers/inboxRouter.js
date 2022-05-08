//external imports
const express = require("express");

//internal imports
const { getInbox } = require("../controllers/inboxController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

//login page

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
