const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    moderators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        }
    ]},{
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
        }
);

const Group = mongoose.model("Group",groupSchema);

module.exports = Group ;
