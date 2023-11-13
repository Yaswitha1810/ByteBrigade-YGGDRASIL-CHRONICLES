//jshint esversion:6

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect.js");
const userRoutes = require("./route/users/usersRoute.js");
const postRoute = require("./route/posts/postRoute.js");
const { errorHandler, notFound } = require("./middleware/error/errorHandler.js");

const app = express();

//Database Connection
dbConnect();

//Middleware
app.use(express.json());

//Users Route
app.use("/api/users", userRoutes);

//Post Route
app.use("/api/posts",postRoute);

//error handler
app.use(notFound);
app.use(errorHandler); 


const PORT = process.env.PORT || 3000

app.get("/", function(req, res){
    //console.log(req);
    res.send("<h1>This is our server</h1><h2>We are ByteBrigrade</h2>");
})

app.listen(PORT, function(){
    console.log(`Server started on ${PORT}`);
});

