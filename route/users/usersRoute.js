const express = require("express");
const {
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
  forgetVerifyCtrl,
  forgetPasswordLoad,
  resetPassword,
} = require("../../controllers/users/usersCtrl.js");
const authMiddleware = require("../../middleware/auth/authMiddleware.js");
const {
  photoUpload,
  profilePhotoResize,
} = require("../../middleware/uploads/photoUpload.js");

const userRoutes = express.Router();

userRoutes.get("/login", (req, res) => {
  res.render("login.ejs");
});
userRoutes.get("/register", (req, res) => {
  res.render("login.ejs");
});
userRoutes.get("/forget", (req, res) => {
  res.render("forget.ejs");
});
userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/logout", authMiddleware, logoutUserCtrl);
// userRoutes.get("/",authMiddleware, fetchUsersCtrl);
userRoutes.get("/profile/:id", userProfileCtrl);
userRoutes.put(
  "/profilephoto-upload",
  authMiddleware,
  photoUpload.single("image"),
  profilePhotoResize,
  profilePhotoUploadCtrl
);
userRoutes.put("/:id", authMiddleware, updateUserCtrl);
userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);
userRoutes.post("/follow", authMiddleware, followingUserCtrl);
userRoutes.post("/unfollow", authMiddleware, unfollowUserCtrl);
userRoutes.post("/block-user/:id", authMiddleware, blockUserCtrl);
userRoutes.post("/unblock-user/:id", authMiddleware, unBlockUserCtrl);
userRoutes.delete("/:id", deleteUserCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);
userRoutes.post("/forget", forgetVerifyCtrl);
userRoutes.get("/forget-password/:token", forgetPasswordLoad);
userRoutes.post("/forget-password", resetPassword);
module.exports = userRoutes;
