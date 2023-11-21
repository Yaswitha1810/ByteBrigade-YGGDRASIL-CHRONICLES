const express = require("express");
const expressAsyncHandler = require("express-async-handler");

const Group = require("../../model/group/Group");

const adminAuth = expressAsyncHandler(async(req,res,next)=>{
    const userId = req?.user?._id;
    const isAdmin = await Group.findOne({_id: id, admins: userId});
    if(isAdmin){
        next();
    }
    else{
        throw new Error("Not a admin");
    }
});

const adminAndModeratorAuth = expressAsyncHandler(async(req,res,next)=>{
    const { id } = req.params;
    const userId = req?.user?._id;
    const isAdmin = await Group.findOne({_id: id,admins: userId});
    const isModerator = await Group.findOne({_id: id,moderators: userId});
    if(isAdmin || isModerator){
        next();
    }
    else{
        throw new Error("Not a admin");
    }
});

const memberAuth = expressAsyncHandler(async(req,res,next)=>{
    const { id } = req.params;
    const userId = req?.user?._id;
    const isMember = await Group.findOne({_id: id, members: userId});
    const isModerator = await Group.findOne({_id: id,moderators: userId});
    const isAdmin = await Group.findOne({_id: id,admins: userId});
    if(isMember || isModerator || isAdmin){
        next();
    }
    else{
        throw new Error("Not a admin");
    }
});

module.exports = {  adminAuth,
                    adminAndModeratorAuth,
                    memberAuth} ;