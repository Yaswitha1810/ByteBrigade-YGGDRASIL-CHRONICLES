//jshint esversion:6

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect.js");
const userRoutes = require("./route/users/usersRoute.js");
const { errorHandler, notFound } = require("./middleware/error/errorHandler.js");

const app = express();

//Database Connection
dbConnect();

//Middleware
app.use(express.json());

//Users Route
app.use("/api/users", userRoutes);

//error handler
app.use(notFound);
app.use(errorHandler); 


const PORT = process.env.PORT || 3000

app.get("/", function(req, res){
    res.send("this is our server");
})

app.listen(PORT, function(){
    console.log(`Server started on ${PORT}`);
});

