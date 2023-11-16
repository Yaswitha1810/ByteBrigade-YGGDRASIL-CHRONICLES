//jshint esversion:6

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const dbConnect = require("./config/db/dbConnect.js");
const userRoutes = require("./route/users/usersRoute.js");
const postRoute = require("./route/posts/postRoute.js");
const { errorHandler, notFound } = require("./middleware/error/errorHandler.js");
//const cors = require("cors");(use later)

const app = express();

//Database Connection
dbConnect();

//Middleware
app.use(express.json());
//app.use(bodyParser.json());
//app.use(cors()) (use later)
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.set("view engine","ejs");

//home page
app.get("/",(req,res)=>{
    res.render("home.ejs");
});

//Users Route
app.use("/api/users", userRoutes);

//Post Route
app.use("/api/posts",postRoute);

//error handler
app.use(notFound);
app.use(errorHandler); 


const PORT = process.env.PORT || 3000

// app.get("/", function(req, res){
//     res.send("<h1>This is our server</h1><h2>We are ByteBrigade</h2>");
// })

app.listen(PORT, function(){
    console.log(`Server started on ${PORT}`);
});

