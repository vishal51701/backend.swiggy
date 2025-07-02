const Product = require("../models/Products");
const multer = require("multer");
const Firm = require('../models/Firm');
const Path = require("path"); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + Path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

const addproduct = async (req, res) => {
    try {
        const { productname, price, category, bestseller, desription } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId.trim();
const firm = await Firm.findById(firmId);  

        if (!firm) {
            return res.status(404).json({ error: 'no firm found' });
            
        }


        const product = new Product({
            productname, price, category, bestseller, desription, image, firm: firm._id
        });
        const savedproduct = await product.save();
        firm.products.push(savedproduct);
        await firm.save();

        res.status(200).json(savedproduct);
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" });
    }
};


const getproductByfirm = async (req, res) => {
    try {
        const firmId = req.params.firmId.trim(); 
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: 'no firm found' });
        }

        const restraurentName=firm.firmname;


        const products = await Product.find({ firm: firmId }); 
        res.status(200).json({restraurentName,products});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" });
    }
};


const deleteproductByid=async(req,res)=>{
try {
    const productId=req.params.productId;

    const deletedProduct=await Product.findByIdAndDelete(productId)

    if(!deletedProduct){
        return res.status(404).json({error:"no product found"})

    }
} catch (error) {
    console.error(error);
        res.status(500).json({ error: "internal server error" });
    
}
}


module.exports = { addproduct: [upload.single('image'), addproduct],getproductByfirm ,deleteproductByid};
