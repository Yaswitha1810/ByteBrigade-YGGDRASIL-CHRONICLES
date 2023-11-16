const express = require("express");
const { createPostCtrl,
        fetchPostsCtrl,
        fetchPostCtrl,
        updatePostCtrl,
        deletePostCtrl,
        toggleAddLikeToPostCtrl,
        toggleAddDislikeToPostCtrl} = require("../../controllers/posts/postsCtrl");
const authMiddleware = require("../../middleware/auth/authMiddleware.js");

const postRoute = express.Router();

//uploading pictures is pending!!
postRoute.put("/likes",authMiddleware, toggleAddLikeToPostCtrl);
postRoute.put("/dislikes",authMiddleware,toggleAddDislikeToPostCtrl);
postRoute.post("/create",authMiddleware, createPostCtrl);
postRoute.get("/",fetchPostsCtrl);
postRoute.get("/:id",fetchPostCtrl);
postRoute.post("/:id",authMiddleware, updatePostCtrl);
postRoute.delete("/:id",authMiddleware, deletePostCtrl);

module.exports = postRoute;