const express = require('express');
const dotEnv = require("dotenv");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const Vendorrouter = require('./routes/Vendorrouter');
const FirmRoutes=require('./routes/FirmRoute');
const productRoutes=require('./routes/ProductsRoutes')
const path=require('path')
const app = express();
const PORT = process.env.PORT||4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => { 
    console.log("mongo db connected successfully");
})
.catch((error) => {
    console.log(error);
});


// app.use(express.json());

// MIDDLEWARE ORDER IS IMPORTANT
app.use(bodyparser.json());
app.use('/Vendor', Vendorrouter);
app.use('/Firm',FirmRoutes)
app.use('/product', productRoutes);
app.use('/uploads',express.static('uploads')) 


app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});

app.use('/home', (req, res) => {
    res.send("<h1>welcome to my swiggy page");
});
