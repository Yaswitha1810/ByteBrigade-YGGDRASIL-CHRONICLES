const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");
const nodemailer = require("nodemailer");
const User = require("../../model/user/User");
const generateToken = require("../../config/token/generateToken");
const validateMongodbId = require("../../utils/validateMongodbId");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const {
  sendVerifyMailCtrl,
  verifyMail,
} = require("../EmailMessaging/emailMsgCtrl.js");
//Register
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  // Check if user already exists
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) throw new Error("User already exists");

  try {
    const user = await User.create({
      userName: req?.body?.userName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    const token = generateToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 20 * 4 * 60 * 60 * 1000,
    });

    const userData = await user.save();
    console.log(req.body);
    console.log(userData._id);
    if (userData) {
      // Use sendVerifyMailCtrl
      const email = req.body.email;
      const userId = userData._id;

      // Connect with the SMTP
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

      // Compose the email message
      let message = {
        from: process.env.SERVER_MAIL, // Sender address
        to: email, // Receiver's email
        subject: "Verify your email", // Subject line
        text: "Please click the link to verify your email.", // Plain text body
        html: `<b>Hey there!</b><br/><br/>Please click <a href="http://localhost:3000/api/email/verify/${userId}">here</a> to verify your email.`, // HTML body
      };

      // Send the email
      transporter
        .sendMail(message)
        .then((info) => {
          return res.status(201).json({
            msg: "You should receive an email shortly.",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info),
          });
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });

      console.log("Sent verification email");
      // return res.status(201).json({
      //   message: "Your registration has been done. Please verify your mail.",
      // });
    } else {
      return res.status(400).json({ message: "Your registration has failed" });
    }

    // res.redirect("/");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Login
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email: req?.body?.email });
  if (userFound && (await userFound.isPasswordMatched(password))) {
    const token = generateToken(userFound?._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 20 * 4 * 60 * 60 * 1000,
    });
    res.redirect("/");
  } else {
    res.status(401);
    throw new Error("Invalid Login credentials");
  }
});

//logout
const logoutUserCtrl = expressAsyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  } catch (error) {
    res.json(error);
  }
});

//users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//delete user
const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({ mssg: "deletion done!" });
  } catch (error) {
    res.json(error);
  }
});

//user details
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await User.findById(id).populate("posts");
    //res.json(user);
    res.render("dashboard", { user });
  } catch (error) {
    res.json(error);
  }
});

//user profile
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await User.findById(id).populate("posts");
    res.render("user-profile", { user });
  } catch (error) {
    res.json(error);
  }
});

//update user profile
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateMongodbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      userName: req?.body?.userName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

//update password
const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    //console.log("password updated" + password);
    res.json(updatedUser);
  }
  res.json(user);
  //console.log("password not updated");
});

//following
const followingUserCtrl = expressAsyncHandler(async (req, res) => {
  //1. find the user that you want to follow and update its followers field
  //2. update the login user following field
  const { followId } = req.body;
  const loginUserId = req.user.id;

  //find the target user and check if the login id exist
  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );
  if (alreadyFollowing) throw new Error("already following");
  //1.finding the user you want to follow and update it's followers field
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );

  //2. update the login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );
  res.json("you have successfully followed this user");
});

//unfollow
const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { unfollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unfollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    { new: true }
  );
  res.json("you have succesfully unfollowed this user");
});

//block user
const blockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json(user);
});

//unBlock user
const unBlockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json(user);
});

//generate token

//profile photo upload
const profilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
  //Find the login user
  const { _id } = req.user;

  //1. Get the oath to img
  const localPath = `public/images/profile/${req.file.filename}`;
  //2.Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
  const foundUser = await User.findByIdAndUpdate(
    _id,
    { profilePhoto: imgUploaded?.url },
    { new: true }
  );
  fs.unlinkSync(localPath);
  res.json(foundUser);
});

//forget password
const forgetLoadCtrl = expressAsyncHandler(async (req, res) => {
  try {
    // res.render("forget");
    console.log("helloooooo");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  logoutUserCtrl,
  fetchUsersCtrl,
  deleteUserCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  profilePhotoUploadCtrl,
  forgetLoadCtrl,
};
