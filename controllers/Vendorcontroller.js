const Vendor = require('../models/Vendors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv=require('dotenv');

dotenv.config();
const secretekey=process.env.MY_NAMEIS

const vendorregister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json("email already taken");
        }
        const hashedpassword = await bcrypt.hash(password, 10);

        const newVendor = new Vendor({
            username,
            email,
            password: hashedpassword
        });

        await newVendor.save();
        res.status(201).json({ message: 'registered successfully' });
        console.log("registered");
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
        console.error(error);
    }
};

const vendorlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(404).json({ error: 'email or paswword unmatched' });
        }

        const token=jwt.sign({vendorid:vendor._id},secretekey,{expiresIn:'10d'})
const vendorId=vendor._id;
        res.status(200).json({ success: 'login success',token,vendorId});
        console.log(email,"this is token",token);
        console.log('login success');
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getallvendors = async (req, res) => {
  try {
    const allVendors = await Vendor.find().populate('firm');
    res.json({ vendors: allVendors });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal server error' });
  }
};


const vendorsgetbyid = async (req, res) => {
  const vendorid = req.params.id;

  try {
  const vendor = await Vendor.findById(vendorid).populate('firm');
  if (!vendor) {
    return res.status(404).json({ error: 'Vendor not found' });
  }

  const vendorObject = vendor.toObject(); // flatten first

// Handle both array and object cases
let vendorFirmId = null;

if (Array.isArray(vendorObject.firm)) {
  vendorFirmId = vendorObject.firm?.[0]?._id || null;
} else if (vendorObject.firm && typeof vendorObject.firm === 'object') {
  vendorFirmId = vendorObject.firm._id || vendorObject.firm;
}

console.log("Vendor firm data:", vendor.firm); // ✅ Debug log
console.log("vendorFirmId:", vendorFirmId);
console.log("vendor:", vendor);

  res.status(200).json({
    vendor: {
      ...vendorObject,
      vendorFirmId
    }
  });

} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
}

}
module.exports = { vendorregister,vendorlogin,getallvendors,vendorsgetbyid };
