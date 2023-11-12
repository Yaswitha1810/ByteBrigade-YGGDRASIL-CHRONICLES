const express = require("express");
const { 
    userRegisterCtrl,
    loginUserCtrl,
    fetchUsersCtrl,
    deleteUserCtrl,
    fetchUserDetailsCtrl,
    userProfileCtrl,
    updateUserCtrl,
    updateUserPasswordCtrl,
} = require("../../controllers/users/usersCtrl.js");
const authMiddleware = require("../../middleware/auth/authMiddleware.js");
const userRoutes= express.Router();


userRoutes.post("/register", userRegisterCtrl );
userRoutes.post("/login",loginUserCtrl);
userRoutes.get("/",authMiddleware, fetchUsersCtrl);
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
userRoutes.put("/:id",authMiddleware, updateUserCtrl);
userRoutes.put("/password",authMiddleware, updateUserPasswordCtrl);
userRoutes.delete("/:id",deleteUserCtrl);
userRoutes.get("/:id",fetchUserDetailsCtrl );

module.exports = userRoutes;
