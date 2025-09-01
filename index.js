const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const VendorRouter =require('./routes/Vendorroutes')
const FirmRoutes = require('./routes/FirmRoute');
const productRoutes = require('./routes/ProductsRoutes');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4000;
dotenv.config();



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error(error));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/Vendor', VendorRouter);
app.use('/Firm', FirmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Sample route
app.use('/home', (req, res) => {
  res.send("<h1>Welcome to my swiggy page</h1>");
});

// Start the server on a port


