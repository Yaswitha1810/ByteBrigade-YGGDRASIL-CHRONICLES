const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: [true,"Post is Required"],
    },
    user: {
        type: Object,
        required: [true, "User is Required"],
    },
    description: {
        type: String,
        required: [true,"Comment is required"],
    },
    },{ timestamps: true }
);

const Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;