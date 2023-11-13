const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, " Blog Title is required" ],
        trim: true,
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Blog Author is required"],
    },
    image: {
        type: String,
        default: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1542435503-956c469947f6%3Fauto%3Dformat%26fit%3Dcrop%26q%3D80%26w%3D1000%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMjY0NDk1fHxlbnwwfHx8fHw%253D&tbnid=oSBwTJuNbuwlDM&vet=12ahUKEwic0qTG47uCAxVIamwGHU69Cd8QMygWegUIARCWAQ..i&imgrefurl=https%3A%2F%2Funsplash.com%2Fcollections%2F1264495%2Fwriting%252Fblogging-aesthetic&docid=XGPg6HX6pfRthM&w=1000&h=750&q=aesthetic%20blog%20pictures&ved=2ahUKEwic0qTG47uCAxVIamwGHU69Cd8QMygWegUIARCWAQ",
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

const Post = mongoose.model("Post",postSchema);

module.exports = Post;