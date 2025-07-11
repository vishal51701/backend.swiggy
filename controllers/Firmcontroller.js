const Firm = require('../models/Firm');
const Vendor = require('../models/Vendors'); // Make sure this is capital "V"

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + Path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmname, area, category, region, offer } = req.body;

        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId); // Fix: use "Vendor" (capital V) and req.vendorId

        if (!vendor) {
            return res.status(404).json({ message: 'vendor not found' }); // Fix typo in message
        }

        const firm = new Firm({
            firmname,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

       const savedfirm= await firm.save();
       vendor.firm.push(savedfirm)
       await vendor.save()

        return res.status(200).json({ message: 'firm added successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const deleteFirmByid=async(req,res)=>{
try {
    const FirmId=req.params.FirmId;

    const deletedFirm=await Firm.findByIdAndDelete(FirmId)

    if(!deletedFirm){
        return res.status(404).json({error:"no product found"})

    }
} catch (error) {
    console.error(error);
        res.status(500).json({ error: "internal server error" });
    
}
}

module.exports = { addFirm: [upload.single('image'), addFirm] ,deleteFirmByid};
