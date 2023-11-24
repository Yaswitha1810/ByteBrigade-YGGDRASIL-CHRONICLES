const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");

const User = require("../../model/user/User");
const Post = require("../../model/post/Post");
const Category = require("../../model/category/Category");

const homePage=expressAsyncHandler(async(req,res)=>{
    try{
        const mostViews =  await Post.find({}).populate("user").sort({numViews : -1}).limit(1);
        const posts = await Post.find({}).populate("user").sort({_id : -1}).limit(6);
        const categories = await Category.find({}).sort({_id: -1}).limit(6);
        res.render('home', {moment,mostViews,posts,categories});
    }catch(error){
        res.json(error);
    }
});

module.exports = homePage;