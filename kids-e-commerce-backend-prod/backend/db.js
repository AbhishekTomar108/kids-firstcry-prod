const mongoose = require('mongoose');

async function connecttomongo() {
  try {
    await mongoose.connect('mongodb+srv://abhishektomar9211:Ecommerce9211@cluster0.u3ik2zy.mongodb.net/kidsECommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

module.exports = connecttomongo;







