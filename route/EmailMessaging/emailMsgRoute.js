const express = require("express");
const { sentEmailMsgCtrl, sendEmailMsgCtrl } = require("../../controllers/EmailMessaging/emailMsgCtrl");
const authMiddleware = require("../../middleware/auth/authMiddleware");

const emailMsgRoute = express.Router();

emailMsgRoute.post("/",authMiddleware, sendEmailMsgCtrl);

module.exports = emailMsgRoute;