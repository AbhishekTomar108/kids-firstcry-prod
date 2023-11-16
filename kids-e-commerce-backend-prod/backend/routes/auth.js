const express = require("express");
const User = require("../models/User");
const UserAddress = require("../models/UserAddress");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');
const sendmail = require('../controller/sendmail')


const JWT_SECRET = "mmm";

// Route-1 Create a user using :"POST /api/auth". No Log in required
router.post(

  "/",
  [
    body("email").isEmail(),
    body("password", "password cannot be blank").exists(),
    body("name", "please enter correct name").isLength({ min: 5 }),
  ],
  async (req, res) => {

  
   
    // if there are error retuen bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check whether email is already is exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ "error": "sorry a user with this email is already is exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const securedpassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: securedpassword,
        email: req.body.email,
      });

          // if(User){

      //   res.send({"success":true,"user":user})
      // }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = await jwt.sign(data, JWT_SECRET);
      console.log(authtoken + " and " + JWT_SECRET);
      // res.json({ authtoken });


      res.send({"success":true,"user":user, "authToken":authtoken})
    } catch (error) {
     
      console.error(error.message);
      res.status(500).send({"error":"some error occured"});
    }
  }
);

// ROUTE-2 user login using post 

router.post(
    "/login",
    [
      body("email").isEmail(),
      body("password", "password cannot be blank").exists(),
    ],
    async (req, res) => {
   
      // if there are error return bad request and error
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ "error": errors.array() });
      }
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ "error": "please log in with correct details" });
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
          return res
            .status(400)
            .json({ "error": "please log in with correct details" });
        }

     
        const data = {
          user: {
            id: user.id,
          },
        };
  
        const authtoken = await jwt.sign(data, JWT_SECRET);
        console.log(authtoken + " and " + JWT_SECRET);
  
      
        res.send({"success":true,"user":user, "authToken":authtoken})
      } catch (error) {
        console.error(error.message);
        res.status(500).send({"error":"some error occured"});
      }
    }
  );
  
  //ROUTE-3 Get loggein details using "POST /api/auth/getuser". login Required
  
  router.get("/getuser", fetchuser, async (req, res) => {
 
    try {
      console.log("running from try ");
      const UserId = req.user.id;
      const user = await User.findById(UserId).select("-password");
      res.send({"success":true,"user":user});
    } 
    catch (error) { 
      console.error(error.message);
      res.status(500).send({"error":"some error occured"});
      res.json({error:error.message});
    }
  });


  // ROUTE-3 post user address correspond to logged in user using post. login required

  router.post("/adduseraddress", fetchuser, async(req, res)=>{
  console.log('next called')
    
    try{
      const { firstName, lastName, email, mobile, addressLine1, addressLine2, country, city, state, zipCode} = req.body;
    
      let checkUser = await UserAddress.findOne({user:req.user.id})

      if(checkUser){
        console.log('checkuser ', checkUser, req.user)
      }

      
      
      const useraddress= await UserAddress.create({
        firstName,
        lastName,
        email,
        mobile,
        addressLine1,
        addressLine2,
        country,
        city,
        state,
        zipCode,
        user:req.user.id
      });
      // const savedUsedAddress = await UserAddress.save();
      res.json({ "success": true, "useraddress": useraddress });
    }
    catch{
      // console.error(error.message);
      res.status(500).send({ "error": "Internal server error" });
    }
  })

  
// Route to check user address is already existed or not

router.get('/checkuseraddress',fetchuser,async(req,res)=>{

    const checkUser = await UserAddress.findOne({user:req.user.id})

    if(checkUser){
      res.send({"userstatus":true,"user":checkUser});
    }
    else{
      res.send({"userstatus":false,"user":checkUser})
    }

  })

  // ROUTE to update user address

  router.post('/updateaddress/:id',fetchuser,async(req,res)=>{
    const { firstName, lastName, email, mobile, addressLine1, addressLine2, country, city, state, zipCode} = req.body;


    const updateData = await UserAddress.findByIdAndUpdate(req.params.id,{$set:
      {firstName,
      lastName,
      email,
      mobile,
      addressLine1,
      addressLine2,
      country,
      city,
      state,
      zipCode,
      user:req.user.id}
    })

    res.send(updateData);

  })

  
  // Route to send mail

  router.get('/mail',sendmail)


 
  


module.exports = router;