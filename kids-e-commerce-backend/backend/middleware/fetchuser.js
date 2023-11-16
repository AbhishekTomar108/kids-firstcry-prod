var jwt = require("jsonwebtoken");

const JWT_SECRET = "mmm";

const fetchuser =(req, res, next)=>{
    // get the user from the jwt token and dd id to req object
    console.log("calling fetchuser");
    const token =  req.header('auth-token');
    if(token==="null")
    {
        console.log("token is not running")
        res.status(401).send({"error":"you are unauthorized"});
    }
    try{
        console.log("try is running");
    const data = jwt.verify(token, JWT_SECRET);
    
    req.user = data.user;
    console.log("data",req.user);
    next();
    }
    catch(error){
       
        res.status(401).send({"error":"you are unauthorized"});
    }
}
module.exports = fetchuser;