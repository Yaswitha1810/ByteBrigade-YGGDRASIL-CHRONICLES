const express = require("express");
const { getCreatePageCtrl,
        createPostCtrl,
        fetchPostsCtrl,
        fetchCategoryPostCtrl,
        fetchPostCtrl,
        getUpdatePageCtrl,
        updatePostCtrl,
        deletePostCtrl,
        toggleAddLikeToPostCtrl,
        toggleAddDislikeToPostCtrl,
        searchPostsCtrl} = require("../../controllers/posts/postsCtrl");
const authMiddleware = require("../../middleware/auth/authMiddleware.js");
const { photoUpload,
        postImgResize,} = require("../../middleware/uploads/photoUpload.js");

const postRoute = express.Router();

//uploading pictures is pending!!
postRoute.post("/likes",authMiddleware, toggleAddLikeToPostCtrl);
postRoute.post("/dislikes",authMiddleware,toggleAddDislikeToPostCtrl);
postRoute.get("/create", getCreatePageCtrl)
postRoute.post("/create",authMiddleware,
                        photoUpload.single("image"),
                        postImgResize,
                        createPostCtrl);
postRoute.get("/",fetchPostsCtrl);
postRoute.post("/search",searchPostsCtrl);
postRoute.get("/category/:id",fetchCategoryPostCtrl);
postRoute.get("/:id",fetchPostCtrl);
postRoute.get("/update/:id",authMiddleware, getUpdatePageCtrl);
postRoute.post("/update",authMiddleware, updatePostCtrl);
postRoute.post("/delete/:id",authMiddleware, deletePostCtrl);

module.exports = postRoute;