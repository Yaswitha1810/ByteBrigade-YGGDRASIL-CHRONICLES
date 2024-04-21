const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const EmailMsg = require("../../model/email-messaging/EmailMessaging");
const Filterer = require("bad-words");
const User = require("../../model/user/User");
const sendVerifyMailCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
});

const verifyMail = async (req, res) => {
  console.log(req.params.id);
  try {
    const updateInfo = await User.updateOne(
      { _id: req.params.id },
      { $set: { isAccountVerified: true } }
    );
    console.log(updateInfo);
    res.render("email-verified");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendVerifyMailCtrl, verifyMail };
