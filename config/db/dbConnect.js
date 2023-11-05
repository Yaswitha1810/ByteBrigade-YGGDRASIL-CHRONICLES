const mongoose = require("mongoose");

const dbConnect = async() => {
    try{
        await mongoose.connect("mongodb+srv://yaswitha:RE193xOvvringznn@bytebrigade.xsquepm.mongodb.net/");
        console.log("DataBase is connected successfully");
    } catch(error){
        console.log('error ${error.message}');
    }
}

module.exports = dbConnect;