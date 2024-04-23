const Post = require("../../model/post/Post");
const Category = require("../../model/category/Category");

const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const validateMongodbId = require("../../utils/validateMongodbId");
const cloudinaryUploadImg = require("../../utils/cloudinary");

//const Filter = require("bad-words");
//blocking user is not done!!
//uploading photo also!!

//get create page
const getCreatePageCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render("add-blog", { categories });
  } catch (error) {
    res.json(error);
  }
});

//create post
const createPostCtrl = expressAsyncHandler(async (req, res) => {
  validateMongodbId(req.user._id);
  //const filter = new Filter();
  const localPath = `public/images/post/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadImg(localPath);
  try {
    const post = await Post.create({
      ...req.body,
      image: imgUploaded?.url,
      user: req?.user?._id,
    });
    fs.unlinkSync(localPath);
    res.redirect("/api/posts/" + post._id);
  } catch (error) {
    res.json(error);
  }
});

//fetch post of certain category
const fetchCategoryPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  //console.log(search);
  try {
    const categoryName = await Category.findById(id);
    const posts = await Post.find({ category: categoryName.title })
      .populate("user")
      .sort({ _id: -1 });
    const categories = await Category.find({});
    res.render("all-blogs", { moment, posts, categories });
  } catch (error) {
    res.json(error);
  }
});

//search
const searchPostsCtrl = expressAsyncHandler(async (req, res) => {
  const search = req?.body?.category;
  if (search != "") {
    try {
      const category = await Category.findOne({ title: search }).sort({
        _id: -1,
      });
      res.redirect("/api/posts/category/" + category._id);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.redirect("back");
  }
});

//fetch all posts
const fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user").sort({ _id: -1 });
    const categories = await Category.find({});
    res.render("all-blogs", { moment, posts, categories });
  } catch (error) {
    res.json(error);
  }
});

//fetch one post
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("likes")
      .populate("dislikes")
      .sort({ _id: -1 });
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.render("blog", { moment, post });
  } catch (error) {
    res.json(error);
  }
});

//update post
const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        //update the properties in body
        ...req.body,
        user: req.user?.id,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//delete post
const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findOneAndDelete(id);
    res.redirect("/");
  } catch (error) {
    res.json(error);
  }
});

//like post
const toggleAddLikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  //get post id from request body
  const { postId } = req.body;
  //find that full post details with postId
  const post = await Post.findById(postId);
  //get userId
  const loginUserId = req?.user?._id;
  //check if already liked
  const isLiked = post?.isLiked;
  //check if already disliked
  const alreadyDisliked = post?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId.toString()
  );
  //if disliked, remove from disliked array
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //if already liked, now wants to remove it
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

//dislike post
const toggleAddDislikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);
  const loginUserId = req?.user?._id;
  const isDisliked = post?.isDisliked;
  const alreadyLiked = post?.likes?.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  if (alreadyLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }

  if (isDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

module.exports = {
  getCreatePageCtrl,
  createPostCtrl,
  searchPostsCtrl,
  fetchPostsCtrl,
  fetchCategoryPostCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleAddLikeToPostCtrl,
  toggleAddDislikeToPostCtrl,
};
