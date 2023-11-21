const express = require("express");
const { createCategoryCtrl,
        fetchAllCategoryCtrl,
        fetchCategoryCtrl,
        updateCategoryCtrl,
        deleteCategoryCtrl } = require("../../controllers/category/categoryCtrl");
const authMiddleware = require("../../middleware/auth/authMiddleware");

const categoryRoute = express.Router();

categoryRoute.post("/",authMiddleware, createCategoryCtrl);
categoryRoute.get("/",authMiddleware, fetchAllCategoryCtrl);
categoryRoute.get("/:id",authMiddleware, fetchCategoryCtrl);
categoryRoute.put("/:id",authMiddleware, updateCategoryCtrl);
categoryRoute.delete("/:id",authMiddleware, deleteCategoryCtrl);

module.exports = categoryRoute;


