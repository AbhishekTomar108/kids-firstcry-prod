const mongoose = require('mongoose');
const { Schema } = mongoose;

const allProductSchema = new Schema({
   
    title: {
        type: String,
    
    },
    price: {
        type: Number,
       
    },
    description: {
        type: String,
       
    },
    category: {
        type: String,
        
    },
    image: {
        type: String,
   
    },
    product: {
        type: String,
   
    },
    productname: {
        type: String,
   
    },
    age: {
        type: String,
   
    },
    Brand: {
        type: String,
   
    },
    Type: {
        type: String,
   
    },

    rating: {
        type: Object,
      }
});

module.exports = mongoose.model('allproducts', allProductSchema);
