const express = require("express");
const {
  sendVerifyMailCtrl,
  verifyMail,
} = require("../../controllers/EmailMessaging/emailMsgCtrl");
const authMiddleware = require("../../middleware/auth/authMiddleware");

const emailMsgRoute = express.Router();

emailMsgRoute.get("/verify/:id", verifyMail);

module.exports = emailMsgRoute;
