const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/User");
const generateToken = require("../../config/token/generateToken");
const validateMongodbId = require("../../utils/validateMongodbId");

//Register
const userRegisterCtrl = expressAsyncHandler( async (req,res)=>{
    //check if already exists
    const userExists = await User.findOne({email: req?.body?.email});
    if(userExists) throw new Error("User already exists");
    try{
        const user= await User.create({
            //req.body && req.body.userName == req?.body?.userName
            userName: req?.body?.userName,
            email: req?.body?.email,
            password: req?.body?.password,
        });
        res.json(user);
    }catch(error){
        res.json(error);
    }
});

//Login
const loginUserCtrl = expressAsyncHandler(async(req,res)=>{
    const { email,password }= req.body;
    const userFound = await User.findOne({email: req?.body?.email});
    if(userFound && (await userFound.isPasswordMatched(password))){
        res.json({
            _id: userFound?._id,
            userName: userFound?.userName,
            email: userFound?.email,
            profilePhoto: userFound?.profilePhoto,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id),
        });
    }
    else{
        res.status(401)
        throw new Error("invalid Login credentials");
    }
});

//users
const fetchUsersCtrl = expressAsyncHandler(async (req,res)=>{
    try{
        const users = await User.find({});
        res.json(users);
    }catch(error){
        res.json(error);
    }
});

//delete user
const deleteUserCtrl = expressAsyncHandler(async (req,res)=>{
    const { id } = req.params;
    validateMongodbId(id); 
    try{
        const deletedUser = await User.findByIdAndDelete(id);
    }catch(error){
        res.json(error);
    }
});

//user details
const fetchUserDetailsCtrl = expressAsyncHandler(async (req,res)=> {
    const { id } = req.params;

    validateMongodbId(id);
    try{
        const user = await User.findById(id);
        res.json(user);
    }catch(error){
        res.json(error);
    }
})

//user profile
const userProfileCtrl = expressAsyncHandler(async (req,res)=>{
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const myProfile =await User.findById(id);
    }catch(error){
        res.json(error);
    }
});

//update user profile
const updateUserCtrl = expressAsyncHandler( async (req,res)=>{
    const { _id } = req?.user;
    validateMongodbId(_id);
    const user = awaitUser.findByIdAndUpdate(_id,
        {
            userName: req?.body?.userName,
            email: req?.body?.email,
            bio: req?.body?.bio,
        },
        {
            new: true, runValidators: true,
        })
});

//update password
const updateUserPasswordCtrl = expressAsyncHandler(async (req,res)=>{
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbId(_id);
    const user = await User.findById(_id);

    if(password) {
        user.password = password;
        const updatedUser = await user.save();

    }
    return ;
});
module.exports = { userRegisterCtrl, 
                    loginUserCtrl, 
                    fetchUsersCtrl, 
                    deleteUserCtrl,
                    fetchUserDetailsCtrl,
                    userProfileCtrl,
                    updateUserCtrl,
                    updateUserPasswordCtrl };