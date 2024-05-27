const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, " Blog Title is required" ],
        trim: true,
    },
    description: {
        type: String,
        required: [true, " Blog Description is required" ],
    },
    category: {
        type: String,
        required: [true, "Blog category is required"],
        default: "All",
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isDisliked: {
        type: Boolean,
        default: false,
    },
    numViews: {
        type: Number,
        default: 0,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            //refer tht id from user model
            ref: "User"
        }
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Blog Author is required"],
    },
    image: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcc4UQ5litb7WOp0gZTnDdaXvf8jceHKizg&usqp=CAU",
    },
},{
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
    }
);
//virtual method to populate post comment
// postSchema.virtual("comments", {
//     ref: "Comment",
//     foreignField: "post",
//     localField: "_id",
//   });

const Post = mongoose.model("Post",postSchema);

module.exports = Post;