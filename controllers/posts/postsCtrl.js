const Post = require("../../model/post/Post");
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbId");
//const Filter = require("bad-words");
//blocking user is not done!!
//uploading photo also!!

const createPostCtrl = expressAsyncHandler(async (req,res) => {
    validateMongodbId(req.body.user);
    //const filter = new Filter();
    try{
        const post = await Post.create();
    }catch(error){
        res.json(error);
    }
});

//fetch all posts
const fetchPostsCtrl = expressAsyncHandler(async (req,res)=>{
    try{
        const posts = await Post.find({}).populate("user");
    }catch(error){
        res.json(error);
    }
});

//fetch one post
const fetchPostCtrl = expressAsyncHandler(async (req,res)=>{
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const post = await Post.findById(id).populate(user);
        await Post.findByIdAndUpdate(id,{
            $inc: {numViews: 1},
        },{new: true});
        res.json(post);
    }catch(error){
        res.json(error);
    }
})

//update post
const updatePostCtrl = expressAsyncHandler(async(req,res)=>{
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const post = await Post.findByIdAndUpdate(id, {
            //update the properties in body
            ...req.body,
            user: req.user?.id,
        },{
            new: true,
        });
        res.json(post);
    }catch(error){
        res.json(error);
    }
});

//delete post
const deletePostCtrl = expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
        const post = await Post.findOneAndDelete(id);
        res.json(post);
    }catch(error){
        res.json(error);
    }
});

//like post

module.exports = { createPostCtrl,
                    fetchPostsCtrl,
                    fetchPostCtrl,
                    updatePostCtrl,
                    deletePostCtrl,  
                }