const mongoose = require("mongoose");

const dbConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase is connected successfully");
    } catch(error){
        console.log(`error ${error.message}`);
    }
}

module.exports = dbConnect;
