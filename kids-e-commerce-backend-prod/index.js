const connecttomongo = require('./db')
const product = require('./routes/Products.json')
// const auth = require("./routes/auth")
connecttomongo();

const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors())
app.use('/api/auth',require('./routes/auth')) 
app.use('/api/product',require('./routes/product')) 



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})