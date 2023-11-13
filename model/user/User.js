const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//create schema
const userSchema = new mongoose.Schema({
    userName: {
        required: [true, "User Name is required"],
        type: String,
    },
    profilePhoto: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw0cA9c1fekNVwT7y-YqmvX7&ust=1699303152819000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCPjO2t3brYIDFQAAAAAdAAAAABAE"
    },
    email: {
        type: String,
        required: [true,"Email is required"],
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    postCount: {
        type: Number,
        default: 0,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["Admin", "Guest", "Blogger"],
    },
    isFollowing: {
        type: Boolean,
        default: false, 
    },
    isUnFollowing: {
        type: Boolean,
        default: false,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    viewedBy: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
    },
    followers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
    },
    following: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    active: {
        type: Boolean,
        default: false,
    },
},{
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});

//virtual method to populate user post
userSchema.virtual('posts',{
    ref: 'Post',
    foreignField: 'user',
    localField: '_id',
});

//hash password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next(); 
});

//match password
userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//schema to model
const user = mongoose.model("user",userSchema);

module.exports = user