const expressAsyncHandler = require("express-async-handler");
const Group = require("../../model/group/Group");
const User = require("../../model/user/User");
const validateMongodbId = require("../../utils/validateMongodbId");

//create group
const createGroupCtrl = expressAsyncHandler(async(req,res)=>{
    const id = req.user._id;
    validateMongodbId(id);
    try{
        const group = await Group.create({
            groupName: req?.body?.groupName,
            createdBy: req?.user?._id,
            bio: req?.body?.bio
        });
        const groupId = group._id;
        const grp = await Group.findByIdAndUpdate(groupId,{
            $push: {admins: id}
        });
        res.json(grp);
    }catch(error){
        res.json(error);
    }
});

//fetch all groups
const fetchAllGroupsCtrl = expressAsyncHandler(async(req,res)=>{
    try{
        const groups = await Group.find({}).sort("-created");
        res.json(groups);
    }catch(error){
        res.json(error);
    }
});

//fetch one group
const fetchGroupCtrl = expressAsyncHandler(async(req,res)=>{
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const group = await Group.findById(id);
        res.json(group);
    }catch(error){
        res.json(error);
    }
});

//add member
const addMemberCtrl = expressAsyncHandler(async (req,res)=>{
    const groupId = req?.body?.groupId;
    const userFound = await User.findOne({email: req?.body?.email}); 
    if(!userFound) throw new Error("User not found!");
    try{
        const group = await Group.findByIdAndUpdate(groupId,
            {
                $push:  {members: userFound?._id},
            });
        res.json(group);
    }catch(error){
        res.json(error);
    }
});

//update member as moderator
const updateMemberAsModeratorCtrl = expressAsyncHandler(async(req,res)=>{
    const groupId = req?.body?.groupId;
    const memberId = req?.body?.memberId;
    validateMongodbId(groupId);
    validateMongodbId(memberId);
    try{
        const moderator = await Group.findByIdAndUpdate(groupId, 
            {
                $pull: {members: memberId},
                $push: {moderators: memberId},
            }
        );
        res.json(moderator);
    }catch(error){
        res.json(error);
    }
});

//update member/moderator as admin
const updateMemberAsAdminCtrl = expressAsyncHandler(async(req,res)=>{
    const groupId = req?.body?.groupId;
    const userId = req?.body?.userId;
    validateMongodbId(groupId);
    validateMongodbId(userId);
    const isMember = await Group.findOne({member: userId});
    try{
        if(isMember){
            const admin = await Group.findByIdAndUpdate(groupId, 
                {
                    $pull: {members: userId},
                    $push: {admin: userId},
                }
            );
            res.json(admin);
        }else{
            const admin = await Group.findByIdAndUpdate(groupId, 
                {
                    $pull: {moderator: userId},
                    $push: {admin: userId},
                }
            );
            res.json(admin);
        }
    }catch(error){
        res.json(error);
    }
});

module.exports = {  createGroupCtrl,
                    fetchAllGroupsCtrl,
                    fetchGroupCtrl,
                    addMemberCtrl,
                    updateMemberAsModeratorCtrl,
                    updateMemberAsAdminCtrl}