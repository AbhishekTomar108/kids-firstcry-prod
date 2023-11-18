const express = require("express");
const ProductCart = require("../models/ProductCart");
const savedProductCart = require("../models/savedProductCart");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const JWT_SECRET = "mmm";
// const allproducts = mongoose.model('allproducts', {});
const allproducts = require("../models/Product"); 
const review = require("../models/Review"); 
const allbestsellers = mongoose.model('bestsellers', {});

//ROUTE-1 fetch all product data using Get

router.get("/products", async (req, res) => {

    try {
      const product = await allproducts.find({});
      console.log("running from fetch product =",product)
      return res.json(product);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send({"error":error.message});
    }
    
  });


  // ROUTE - to fetch product based on product title


  router.get("/getProductDetail", async (req, res) => {

    const title = req.header("title")

    try {
      const product = await allproducts.find({title:title});
      console.log("running from fetch product =",product)
      return res.json(product);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send({"error":error.message});
    }
  });


   //Router to add product data 

   router.post("/productDetail",async (req, res) => {

    console.log('hello product router',req.body) 
    req.body.rating = {
      rate:req.body.rate,
      count:req.body.count
    } 
    let addProduct = await allproducts.create(req.body) 
    res.send(addProduct)  
     
    }
  );

  // ROUTE - add Review of Product

  router.post("/addReviews",async (req, res) => {
    try{
      
      let addReview  = await review.create(req.body)
      let productRating = await review.find({productId:req.body.productId}).select("rate")

      productRating = productRating.map(data=>{
        return data.rate
      })

      let rate =  parseInt(calculateAverage(productRating))
      console.log('product rating =',productRating)
      console.log('rating =',rate,productRating.length)

      let rating = {
        rate:rate,
        count:productRating.length
      }

      let addRating = await allproducts.findByIdAndUpdate({_id:req.body.productId},{$set:{rating:rating}})

      res.send({"status":true,"review":addReview})

    }
    catch(error){
      res.send({"status":false,"error":error.message})
    }
  });

  // ROUTER - get All reviews of Product

  router.get("/getProductReview/:id", async (req, res) => {

    const {id} = req.params

    try {
      const productReview = await review.find({productId:id});
      console.log("review data =",productReview)
      return res.json(productReview);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send({"error":error.message});
    }
  });


  // rating cal function 

  const calculateAverage = (ratings) => {
    if (ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((total, rating) => total + rating, 0);
     
    return sum / ratings.length;
  };

  // ROUTE - fetch all bestsellers products

  router.get("/bestsellers", async (req, res) => {

    try {
      const bestseller = await allbestsellers.find({});
      return res.json(bestseller);
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send({"error":error.message});
    }
  });


// Route-2 add product correspond to user using post
router.post(

  "/addproduct",fetchuser,
  async (req, res) => {

    try {
      const { productName, totalItem, productPrice, productId} = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ "error": errors.array() });
      }
    
      let existingProductCart = await ProductCart.findOne({ user: req.user.id, productId: productId });
    
      if (existingProductCart) {
        existingProductCart.totalItem = totalItem;
        existingProductCart.productPrice = productPrice;
        const updatedProductCart = await existingProductCart.save();
        return res.json({ "success": true, "savedproductCart": updatedProductCart });
      }
    
      const productCart = new ProductCart({
        productName,
        totalItem,
        productPrice,
        productId,
        user: req.user.id
      });
    
      const savedProductCart = await productCart.save();
      res.json({ "success": true, "savedproductCart": savedProductCart });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ "error": "Internal server error" });
    }
    
   
  }
);

//ROUTE-3 fetch all product data correspond to user using get

router.get('/fetchalluserproduct',fetchuser, async (req,res)=>
{

    try{
   const productCart  = await ProductCart.find({user:req.user.id})
   
   res.json({"success":true, productCart:productCart});
    }
    catch(error){
        console.error(error.message)
        res.send({"error":error.message})
    }
    // res.json([])
})


// ROUTE - fetch user placed product

router.get('/fetchalluserplacedproduct',fetchuser, async (req,res)=>
{

    try{
   const productCart  = await savedProductCart.find({user:req.user.id})
   
   res.json({"success":true, productCart:productCart});
    }
    catch(error){
        console.error(error.message)
        res.send({"error":error.message})
    }
    // res.json([])
})


// Route to get latest 10 review by user

router.get('/getLatestReview',async(req,res)=>{
  try{
  const latestReviews = await review.find().sort({ date: -1 }).limit(10);
  const totalReviewCount = await review.countDocuments();

  let productData = []

  for(let i=0; i<latestReviews.length; i++){

    let product = await allproducts.findById({_id:latestReviews[i].productId})

    productData.push(product)

  }

  console.log('length =',productData.length)
  res.send({"totalCount":totalReviewCount,"latestReview":latestReviews,"productData":productData})
  }
  catch(error){
   res.send({"status":"error","error":error.message})
  }

})

router.get('/products/product', async(req, res) => {
  const searchQuery = req.query; // Get the search query from the request parameters

  const productdata = await allproducts.find(searchQuery);  
      // return res.json(product);\
      console.log(searchQuery);
   console.log(productdata)
  res.json(productdata);
});



//ROUTE to remove product from ProductCart Collection by its Id

router.post('/removeproductcart/:id', async (req,res)=>
{
  

    try{
  const productCart = await ProductCart.deleteOne({ _id: req.params.id }).exec();
   
   res.json({"success":true, productCart:productCart});
    }
    catch(error){
        console.error(error.message)
        res.send({"error":error.message})
    }
   
})

// ROUTE to update ProductCart collection 


router.post('/updateproductcart/:id', async (req,res)=>
{
  const  id  = req.params.id;
  const  totalitem  = req.body;
  console.log(totalitem)

  try {
    const updatedProductCart = await ProductCart.findByIdAndUpdate(
      id,
      {$set:totalitem },
      { new: true }
    ).exec();

   

    if (!updatedProductCart) {
      return res.status(404).send('ProductCart not found');
    }

    res.send(updatedProductCart);
  } catch (error) {
    res.status(500).send('Error updating ProductCart');
  }
  

  //   try{
  //     const updatedProductCart = await ProductCart.findByIdAndUpdate(
  //       id,
  //       { totalitem },
  //       { new: true }
  //     ).exec();
   
  //  res.json({"success":true, productCart:updatedProductCart});
  //   }
  //   catch(error){
  //       console.error(error.message)
  //       res.send({"error":error.message})
  //   }
   
})

router.post('/productcartsaved',fetchuser, async(req,res)=>{

   const savedproductdata =  await Promise.all(req.body.productCart.map(async(data)=>{

    const referenceId = generateReference()
    const productName = data.productName;
    const productId = data.productId;
    const totalItem = data.totalItem;
    const productPrice =  data.productPrice;
    const deliveryDate = req.body.deliveryDate

    console.log('inside map',referenceId)

    const saved  = await savedProductCart.create({
      productName,
      totalItem,
      productPrice,
      referenceId,
      deliveryDate,
      productId,
      user: req.user.id
    })

    const removeProduct = await ProductCart.findOneAndDelete({user:req.user.id,productId:productId})

    return saved
  }))
  
  res.send(savedproductdata)

})


// function to generate Reference Number

function generateReference() {
  const currentDate = new Date();
  
  // Extract components of the date and time
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
  // Create a reference string using the components
  const reference = `${year}${month}${day}${hours}${minutes}${seconds}`;
  
  return reference;
}



router.post('/payment',async(req,res)=>{
  res.send({"hello":"hello"})
})


module.exports = router;