const express = require("express");
const { createCategoryCtrl,
        fetchAllCategoryCtrl,
        deleteCategoryCtrl } = require("../../controllers/category/categoryCtrl");
const authMiddleware = require("../../middleware/auth/authMiddleware");

const categoryRoute = express.Router();

categoryRoute.post("/",authMiddleware, createCategoryCtrl);
categoryRoute.get("/",authMiddleware, fetchAllCategoryCtrl);
categoryRoute.delete("/",authMiddleware, deleteCategoryCtrl);

module.exports = categoryRoute;


