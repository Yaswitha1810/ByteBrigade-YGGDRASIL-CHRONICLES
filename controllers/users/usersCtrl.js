const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/User");
const generateToken = require("../../config/token/generateToken");
const validateMongodbId = require("../../utils/validateMongodbId");
const path = require('path');

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
        res.render("home.ejs");
    }catch(error){
        res.json(error);
    }
});

//Login
const loginUserCtrl = expressAsyncHandler(async(req,res)=>{
    console.log("checking");
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
        res.render("home.ejs");
    }
    else{
        res.status(401)
        throw new Error("Invalid Login credentials");
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
        res.json({mssg: "deletion done!"});
    }catch(error){
        res.json(error);
    }
});

//user details
const fetchUserDetailsCtrl = expressAsyncHandler(async (req,res)=> {
    const { id } = req.params;

    validateMongodbId(id);
    try{
        const user = await User.findById(id).populate("posts");
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
        res.json(myProfile);
    }catch(error){
        res.json(error);
    }
});

//update user profile
const updateUserCtrl = expressAsyncHandler( async (req,res)=>{
    const { _id } = req?.user;
    validateMongodbId(_id);
    const user = await User.findByIdAndUpdate(_id,
        {
            userName: req?.body?.userName,
            email: req?.body?.email,
            bio: req?.body?.bio,
        },
        {
            new: true, runValidators: true,
        })
    res.json(user);
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
        //console.log("password updated" + password);
        res.json(updatedUser);
    }
    res.json(user);
    //console.log("password not updated");
});

//following
const followingUserCtrl = expressAsyncHandler(async (req,res)=>{
   //1. find the user that you want to follow and update its follwers field
   //2. update the login user following field
   const {followId} = req.body;
   const loginUserId = req.user.id;
   
   //find the target user and check if the login id exist
   const targetUser = await User.findById(followId);

const alreadyFollowing = targetUser?.followers?.find(
    user =>user?.toString() === loginUserId.toString()
    );
if(alreadyFollowing) throw new Error("already following");
   //1.finding the user you want to follow and update it's followers field
   await User.findByIdAndUpdate(followId,{
    $push: {followers: loginUserId},
    isFollowing: true,
   },
   {new: true }
   );


   //2. update the login user following field
   await User.findByIdAndUpdate(loginUserId,{
    $push: {following: followId},
   },{new:true }
   )
   res.json("you have successfully followed this user")

//    console.log({followId,loginUserId})
          res.json("following API")
})


//unfollow

const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
    const {unfollowId} = req.body
    const loginUserId = req.user.id;
    
    await User.findByIdAndUpdate(unfollowId,{
        $pull:{followers: loginUserId },
        isFollowing: false,
    },
    {new:true}
    );

    await User.findByIdAndUpdate(loginUserId,{
        $pull: { following: unFollowId },
    },
    {new:true}
    );
     
    res.json("you have succesfully unfollowed this user")
});
module.exports = { userRegisterCtrl, 
                    loginUserCtrl, 
                    fetchUsersCtrl, 
                    deleteUserCtrl,
                    fetchUserDetailsCtrl,
                    userProfileCtrl,
                    updateUserCtrl,
                    updateUserPasswordCtrl,
                    followingUserCtrl, 
                    unfollowUserCtrl,
                };