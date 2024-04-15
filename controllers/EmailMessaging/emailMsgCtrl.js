const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const EmailMsg = require("../../model/email-messaging/EmailMessaging");
const Filterer = require("bad-words");

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  //connect with the smtp
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SERVER_MAIL,
      pass: process.env.SERVER_PASS,
    },
  });

  let message = {
    from: process.env.SERVER_MAIL, // sender address
    to: "shikshavishwakarma1501@gmail.com", // list of receivers
    subject: "test mail", // Subject line
    text: "mailing system is working", // plain text body
    html: "<b>hey everybuddy !</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  console.log("Sent mail");
  //   const { to, subject, message } = req.body;
  //   const EmailMessage = subject + " " + message;
  //   //checking bad words
  //   const filter = new filter();
  //   const isProfane = filter.isProfane(EmailMessage);
  //   if (isProfane)
  //     throw new Error("Email sent failed, beacause it contains profane words.");
  //   try {
  //     const msg = {
  //       to,
  //       subject,
  //       text: message,
  //       from: "yaswithamuppalla@gmail.com",
  //     };
  //     await sgMail.send(msg);
  //     await EmailMsg.create({
  //       sentBy: req?.user?._id,
  //       from: req?.user?.email,
  //       to,
  //       message,
  //       subject,
  //     });
  //     res.json("Mail sent");
  //   } catch (error) {
  //     res.json(error);
  //   }
});

module.exports = { sendEmailMsgCtrl };
