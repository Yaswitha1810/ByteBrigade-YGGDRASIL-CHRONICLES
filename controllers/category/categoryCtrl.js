const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/Category");
const validateMongodb = require("../../utils/validateMongodbId");


//get create category page
const getCreateCategoryPageCtrl = expressAsyncHandler(async(req,res)=>{
    try{
        const categories = await Category.find({});
        res.render('add-category',{categories});
    }catch(error){
        res.json(error);
    }
});

//create category
const createCategoryCtrl = expressAsyncHandler(async(req,res)=>{
    try{
        const category= await Category.create({
            user: req.user._id,
            title: req?.body?.title,
        });
        res.redirect("/api/users/"+user_id);
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
        res.render("manage-category",{categories});
    }catch(error){
        res.json(error); 
    }
});

//fetch category
const fetchCategoryCtrl = expressAsyncHandler(async(req,res)=>{
    const { id } =req.params;
    try{
        const category = await Category.findById(id)
            .populate("user")
            .sort("-createdAt");
        res.json(category);
    }catch(error){
        res.json(error);
    }
});

//update category
const updateCategoryCtrl = expressAsyncHandler(async(req,res)=>{
    const { id } = req.params;
    validateMongodb(id);
    try{
        const updatedCategory = await Category.findByIdAndUpdate(id,
            {
                title: req?.body?.title,
            },{ 
                new: true,
                runValidators: true,
            });
        res.json(updatedCategory);
    }catch(error){
        res.json(error);
    }
});

//delete category
const deleteCategoryCtrl = expressAsyncHandler(async(req,res)=>{
    const { id } =req.params;
    validateMongodb(id);
    try{
        const deletedCategory=await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    }catch(error){
        res.json(error);
    }
});

module.exports = {  getCreateCategoryPageCtrl,
                    createCategoryCtrl,
                    fetchAllCategoryCtrl,
                    fetchCategoryCtrl,
                    updateCategoryCtrl,
                    deleteCategoryCtrl }