const vendor = require('../models/Vendors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();
const secretekey = process.env.MY_NAMEIS

const verifytoken = async (req, res, next) => {

    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: 'token is required' })
    }
    try {
        const decoded = jwt.verify(token, secretekey)
       const foundVendor = await vendor.findById(decoded.vendorid);

        if (!foundVendor) {
            return res.status(404).json({ error: "vendor not found"})
        }

        req.vendorId = foundVendor._id
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "invalid token" });
    }
}

module.exports = verifytoken
