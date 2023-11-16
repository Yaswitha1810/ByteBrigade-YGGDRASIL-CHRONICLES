const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/Category");

//create category
const createCategoryCtrl = expressAsyncHandler(async(req,res)=>{
    try{
        const category= await Category.create({
            user: req.user._id,
            title: req.body.title,
        });
        res.json(category);
    }catch(error){
        res.json(error);
    }
});

//fetch all category
const fetchAllCategoryCtrl = expressAsyncHandler(async(req,res)=>{
    try{
        const categories = await Category.find({})
            .populate("user")
            .sort("-createdAt");
            res.json(categories);
    }catch(error){
        res.json(error); 
    }
});
//delete category
const deleteCategoryCtrl = expressAsyncHandler(async(req,res)=>{

});

module.exports = { createCategoryCtrl,
                    fetchAllCategoryCtrl,
                    deleteCategoryCtrl
                }