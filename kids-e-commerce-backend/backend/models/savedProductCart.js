const mongoose = require('mongoose');
const { Schema } = mongoose;

const savedProductCartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newuser'
    },
    productName: {
        type: String,
        required: true
    },
    totalItem: {
        type: Number,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('savedproductcarts', savedProductCartSchema);
