const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/Comment");
const validateMongodbId = require("../../utils/validateMongodbId");
const Post = require("../../model/post/Post");

//create comment
const createCommentCtrl = expressAsyncHandler(async(req,res)=>{
    const user = req.user;
    const { postId, description } = req.body;
    try{
        const comment = await Comment.create({
            post: postId,
            user,
            description,
        });
        const commentId = comment._id;
        const post = await Post.findByIdAndUpdate(
            postId, 
            {
                $push: { comments: commentId },
            },
            { new: true }
        )
        res.redirect("/api/posts/"+postId);
    }catch(error){
        res.json(error);
    }
}); 

//fetch all comments
const fetchAllCommentsCtrl = expressAsyncHandler(async(req,res)=>{
    try{
        const comments = await Comment.find({}).sort("-created");
        res.json(comments);
    }catch(error){
        res.json(error);
    }
});

//fetch single comment
const fetchCommentCtrl = expressAsyncHandler(async(req,res)=>{
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const comment = await Comment.findById(id);
        res.json(comment);
    }catch(error){
        res.json(error);
    }
});

//update comment
const updateCommentCtrl = expressAsyncHandler(async(req,res)=>{
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const updatedComment = await Comment.findByIdAndUpdate(id ,{
            post: req?.body?.postId,
            user: req?.user,
            description: req?.body?.description,
        },{
            new: true,
            runValidators: true,
        });
        res.json(updatedComment);
    }catch(error){
        res.json(error);
    }
});

//delete comment
const deleteCommentCtrl = expressAsyncHandler(async(req,res)=>{
    const { id } = req.params;
    validateMongodbId(id);
    try{
        const deletedComment = await Comment.findByIdAndDelete(id);
        res.json(deletedComment);
    }catch(error){
        res.json(error);
    }
});

module.exports = {  createCommentCtrl,
                    fetchAllCommentsCtrl,
                    fetchCommentCtrl,
                    updateCommentCtrl,
                    deleteCommentCtrl 
                }