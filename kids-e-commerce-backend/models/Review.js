const mongoose = require('mongoose');
const { Schema } = mongoose;

const allReviewSchema = new Schema({
   
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'allproducts'
    },

    username: {
        type: String,
    
    },
    email: {
        type: String,
    
    },

    review: {
        type: String,
       
    },
    rate: {
        type: Number,
       
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newuser'
    },
    
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('reviews', allReviewSchema);
