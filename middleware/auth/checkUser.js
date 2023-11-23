const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../model/user/User");

const checkUser = expressAsyncHandler(async(req,res,next)=>{
    const token = req.cookies.jwt;
        if(token){
            try{
                const decoded = jwt.verify(token , process.env.JWT_KEY);
                const user = await User.findById(decoded?.id).select('-password');
                res.locals.user = user;
                next();
            }catch(error){
                res.locals.user = null;
                next();
            }
        }else{
            res.locals.user = null;
            next();
        }
});

module.exports = checkUser