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
        const post = await Post.findById(id).populate("user").populate("likes").populate("dislikes");
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
const toggleAddLikeToPostCtrl = expressAsyncHandler(async(req,res)=>{
    //get post id from request body
    const{ postId } = req.body;
    //find that full post details with postId
    const post = await Post.findById(postId);
    //get userId
    const loginUserId = req?.user?._id;
    //check if already liked
    const isLiked = post?.isLiked;
    //check if already disliked
    const alreadyDisliked = post?.dislikes?.find(userId => userId?.toString()===loginUserId.toString());
    //if disliked, remove from disliked array
    if(alreadyDisliked){
        const post = await Post.findByIdAndUpdate(postId,
            {   
                $pull: {dislikes: loginUserId},
                isDisliked: false,
            },{ new:true });
        res.json(post);
    }
    //if already liked, now wants to remove it
    if(isLiked){
        const post = await Post.findByIdAndUpdate(postId,
            {
                $pull: {likes: loginUserId},
                isLiked: false,
            },{ new: true });
        res.json(post);
    }
    else{
        const post = await Post.findByIdAndUpdate(postId,
            {
                $push: {likes: loginUserId },
                isLiked: true,
            },{ new:true });
        res.json(post);
    }
});

//dislike post
const toggleAddDislikeToPostCtrl = expressAsyncHandler(async(req,res)=>{
    const { postId } = req.body;
    const post = await Post.findById(postId);
    const loginUserId = req?.user?._id;
    const isDisliked = post?.isDisliked;
    const alreadyLiked = post?.likes?.find(userId => userId.toString()===loginUserId.toString());
    if(alreadyLiked){
        const post = await Post.findByIdAndUpdate(postId,
            {
                $pull: {likes: loginUserId},
                isLiked: false,
            },{ new: true});
        res.json(post);
    }

    if(isDisliked){
        const post = await Post.findByIdAndUpdate(postId,
            {
                $pull: {dislikes: loginUserId},
                isDisliked: false,
            },{ new: true});
        res.json(post);
    }
    else{
        const post = await Post.findByIdAndUpdate(postId,
            {
                $push: {dislikes: loginUserId},
                isDisliked: true,
            },{ new: true});
        res.json(post);
    }
});

module.exports = { createPostCtrl,
                    fetchPostsCtrl,
                    fetchPostCtrl,
                    updatePostCtrl,
                    deletePostCtrl,
                    toggleAddLikeToPostCtrl,
                    toggleAddDislikeToPostCtrl,
                }