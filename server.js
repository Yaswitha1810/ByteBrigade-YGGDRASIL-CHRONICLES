//jshint esversion:6

const express = require("express");
const dotenv = require("dotenv");
const { userRegisterCtrl } = require("./controllers/users/usersCtrl.js")

dotenv.config();
const dbConnect = require("./config/db/dbConnect.js");

const app = express();

//Database Connection
dbConnect();

const PORT = process.env.PORT || 3000

app.get("/", function(req, res){
    //console.log(req);
    res.send("<h1>This is our server</h1><h2>We are ByteBrigrade</h2>");
})

app.listen(PORT, function(){
    console.log(`Server started on ${PORT}`);
});

