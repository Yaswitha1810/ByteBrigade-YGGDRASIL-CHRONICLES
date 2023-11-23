//jshint esversion:6

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const dbConnect = require("./config/db/dbConnect.js");

const homePage = require("./controllers/homepage/homePage.js");
const userRoutes = require("./route/users/usersRoute.js");
const postRoute = require("./route/posts/postRoute.js");
const commentRoute = require("./route/comment/commentRoute.js");
const emailMsgRoute = require("./route/EmailMessaging/emailMsgRoute.js");
const categoryRoute = require("./route/category/categoryRoute.js");
const groupRoute = require("./route/group/groupRoute.js");
const { errorHandler, notFound } = require("./middleware/error/errorHandler.js");
const checkUser = require("./middleware/auth/checkUser.js");

const app = express();

//Database Connection
dbConnect();

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//view engine
app.set("view engine","ejs");

//check user
app.get("*",checkUser);

//home page
app.get("/",homePage);

//Users Route
app.use("/api/users", userRoutes);

//Post Route
app.use("/api/posts",postRoute);

//comment route
app.use("/api/comments",commentRoute);

//email Messaging
app.use("/api/email",emailMsgRoute);

//category route
app.use("/api/category",categoryRoute);

//group route
app.use("/api/groups",groupRoute);

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

