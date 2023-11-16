const mongoose = require('mongoose');
const { Schema } = mongoose;

const savedProductCartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newuser'
    },
    productName: {
        type: String,
    },
    referenceId: {
        type: String,
    },
    productId: {
        type: String,
    },
    totalItem: {
        type: Number,
        
    },
    productPrice: {
        type: Number,
    },
    deliveryDate: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('savedproductcarts', savedProductCartSchema);
