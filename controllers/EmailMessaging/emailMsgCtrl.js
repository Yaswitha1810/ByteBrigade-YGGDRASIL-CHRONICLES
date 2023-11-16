const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const EmailMsg = require("../../model/email-messaging/EmailMessaging");
const Filterer = require("bad-words");

const sendEmailMsgCtrl = expressAsyncHandler(async(req,res)=>{
    const { to, subject, message } = req.body;
    const EmailMessage = subject + " " + message;
    //checking bad words
    const filter = new filter();
    const isProfane = filter.isProfane(EmailMessage);
    if(isProfane) throw new Error ("Email sent failed, beacause it contains profane words.");
    try{
        const msg = {
            to,
            subject,
            text: message,
            from: "yaswithamuppalla@gmail.com"
        };
        await sgMail.send(msg);
        await EmailMsg.create({
            sentBy: req?.user?._id,
            from: req?.user?.email,
            to,
            message,
            subject,
        });
        res.json("Mail sent");
    }catch(error){
        res.json(error);
    }
});

module.exports = { sendEmailMsgCtrl };