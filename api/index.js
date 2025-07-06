const express = require('express');
const serverless = require('serverless-http');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const Vendorrouter = require('./routes/Vendorrouter');
const FirmRoutes = require('./routes/FirmRoute');
const productRoutes = require('./routes/ProductsRoutes');

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error(error));

// Middleware
app.use(bodyparser.json());
app.use('/Vendor', Vendorrouter);
app.use('/Firm', FirmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

// Sample route
app.get('/home', (req, res) => {
  res.send("<h1>Welcome to my swiggy page</h1>");
});

// Important: No app.listen()

module.exports = app;
module.exports.handler = serverless(app);
