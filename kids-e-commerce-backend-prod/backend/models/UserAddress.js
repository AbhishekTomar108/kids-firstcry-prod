const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserAddressSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newuser'
    },
    firstName:
    {
        type:String,
        required:true
    },

    lastName:
    {
        type:String,
        required:true,
       
    },

    email:
    {
        type:String,
        required:true
    },
    mobile:
    {
        type:String,
        required:true
    },
    addressLine1:
    {
        type:String,
        required:true
    },
    addressLine2:
    {
        type:String,
        required:true
    },
    country:
    {
        type:String,
        required:true
    },
    city:
    {
        type:String,
        required:true
    },
    state:
    {
        type:String,
        required:true
    },
    zipCode:
    {
        type:String,
        required:true
    },
    date:
    {
        type:Date,
        default:Date.now
    },

  });

  module.exports = mongoose.model('newuseraddress', UserAddressSchema);