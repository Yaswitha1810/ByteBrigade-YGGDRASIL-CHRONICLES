//jshint esversion:6

const express = require("express");
const dbConnect = require("./config/db/dbConnect.js");

const app = express();

//Database COnnection
dbConnect();

const PORT = process.env.PORT || 3000

app.get("/", function(req, res){
    //console.log(req);
    res.send("this is our server");
})

app.listen(PORT, function(){
    console.log(`Server started on ${PORT}`);
});

