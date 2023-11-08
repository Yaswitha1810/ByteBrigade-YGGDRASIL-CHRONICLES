const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../model/user/User");

const authMiddleware = expressAsyncHandler(async (req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            if(token){
                const decoded = jwt.verify(token , process.env.JWT_KEY);

                const user = await User.findById(decoded?.id).select('-password');

                req.user = user;
                next();
            }else{
                throw new Error("There is no token attached");
            }
        }catch(error){
            throw new Error("Not authorized token expired ,Login again!");
        }
    }
    else{
        throw new Error ("There is no token attached");
    }
});

module.exports = authMiddleware ;