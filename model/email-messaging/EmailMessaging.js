const mongoose = require("mongoose");

const emailMsgSchema = new mongoose.Schema({
    fromEmail: {
        type: String,
        required: true,
    },
    toEmail: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: [true, "Message is required"],
    },
    subject: {
        type: String,
        required: true,
    },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isFlagged: {
        type: Boolean,
        default: true,
    }
    },{ timestamps: true });

const EmailMsg = mongoose.model("Email Msg",emailMsgSchema);

module.exports = EmailMsg;