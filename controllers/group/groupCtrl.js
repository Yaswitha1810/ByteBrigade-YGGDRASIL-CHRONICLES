const expressAsyncHandler = require("express-async-handler");
const Group = require("../../model/group/Group");
const User = require("../../model/user/User");
const validateMongodbId = require("../../utils/validateMongodbId");

//create group
const createGroupCtrl = expressAsyncHandler(async(req,res)=>{
    const groupExists = await Group.findOne({groupName: req?.body?.groupName});
    if(groupExists) throw new Error("Group already exists");
    try{
        const group = await Group.create({
            groupName: req?.body?.groupName,
            createdBy: req?.user?._id,
            bio: req?.body?.bio,
            admins: req?.user?._id
        });
        res.json(group);
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
    const {id} = req.params;
    validateMongodbId(id);
    const userFound = await User.findOne({email: req?.body?.email}); 
    if(!userFound) throw new Error("User not found!");
    const isMember = await Group.findOne({_id: id,members: userFound?._id});
    const isModerator = await Group.findOne({_id: id,moderators: userFound?._id});
    const isAdmin = await Group.findOne({_id: id,admins: userFound?._id});
    
    if(isMember || isModerator || isAdmin) throw new Error("Already in the group");
    try{
        const group = await Group.findByIdAndUpdate(id,
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
    const {id} = req.params;
    const userId = req?.body?.userId;
    validateMongodbId(id);
    validateMongodbId(userId);
    const isMember = await Group.findOne({_id: id, members: userId});
    const isModerator = await Group.findOne({_id: id, moderators: userId});
    if(!(isMember|| isModerator)) throw new Error("Not part of the group");
    if(isModerator) throw new Error("Already a moderator");
    try{
        const moderator = await Group.findByIdAndUpdate(id, 
            {
                $pull: {members: userId},
                $push: {moderators: userId},
            }
        );
        res.json(moderator);
    }catch(error){
        res.json(error);
    }
});

//update member/moderator as admin
const updateMemberAsAdminCtrl = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    const userId = req?.body?.userId;
    validateMongodbId(id);
    validateMongodbId(userId);
    const isMember = await Group.findOne({_id: id, members: userId});
    const isModerator = await Group.findOne({_id: id, moderators: userId});
    const isAdmin = await Group.findOne({_id: id,admins: userId});
    if(!(isMember || isModerator || isAdmin)) throw new Error("Not part of the group");
    if(isAdmin) throw new Error("Already a admin");
    try{
        if(isMember){
            const admin = await Group.findByIdAndUpdate(IDBObjectStore, 
                {
                    $pull: {members: userId},
                    $push: {admins: userId},
                }
            );
            res.json(admin);
        }
        if(isModerator){
            const admin = await Group.findByIdAndUpdate(id, 
                {
                    $pull: {moderators: userId},
                    $push: {admins: userId},
                }
            );
            res.json(admin);
        }
    }catch(error){
        res.json(error);
    }
});

//remove member/moderator
const removeMemberCtrl = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    const userId = req?.body?.userId;
    validateMongodbId(id);
    validateMongodbId(userId);
    const isMember = await Group.findOne({_id: id, members: userId});
    const isModerator = await Group.findOne({_id: id, moderators: userId});
    if(!(isMember || isModerator)) throw new Error("Not part of the group");
    try{
        if(isMember){
            const removedMember = await Group.findByIdAndUpdate(id, 
                {
                    $pull: {members: userId}
                }
            );
            res.json(removedMember);
        }
        if(isModerator){
            const removedModerator = await Group.findByIdAndUpdate(id, 
                {
                    $pull: {moderator: userId}
                }
            );
            res.json(removedModerator);
        }
    }catch(error){
        res.json(error);
    }
});

//delete group
const deleteGroupCtrl = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const deletedGroup = await Group.findByIdAndDelete(id);
        res.json(deletedGroup);
    }catch(error){
        res.json(error);
    }
});

module.exports = {  createGroupCtrl,
                    fetchAllGroupsCtrl,
                    fetchGroupCtrl,
                    addMemberCtrl,
                    updateMemberAsModeratorCtrl,
                    updateMemberAsAdminCtrl,
                    removeMemberCtrl,
                    deleteGroupCtrl}