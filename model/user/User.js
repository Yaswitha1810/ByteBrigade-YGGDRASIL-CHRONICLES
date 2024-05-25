const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//create schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      required: [true, "User Name is required"],
      type: String,
    },
    profilePhoto: {
      type: String,
      default:
        "data:image/jpeg;base64,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",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
        },
      ],
    },
    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    token: {
      type: String,
      default: "",
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//virtual method to populate user post
userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

//hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//schema to model
const User = mongoose.model("User", userSchema);

module.exports = User;
