const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");

const User = require("../../model/user/User");
const Post = require("../../model/post/Post");
const Category = require("../../model/category/Category");

const homePage=expressAsyncHandler(async(req,res)=>{
    try{
        const posts = await Post.find({}).populate("user").sort({_id : -1}).limit(6);
        const categories = await Category.find({}).sort({_id: -1}).limit(6);
        //console.log(req);
        res.render('home', {moment,posts,categories});
    }catch(error){
        res.json(error);
    }
});

module.exports = homePage;