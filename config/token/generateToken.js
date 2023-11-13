const jwt = require("jsonwebtoken");

const generateToken = (id) =>{
    //generate token for the id and set the expiration time
    return jwt.sign({id}, process.env.JWT_KEY ,{expiresIn: "20d"});
}

module.exports = generateToken;