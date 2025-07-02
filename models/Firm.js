const mongoose = require('mongoose');
const Product = require('./products');

const firmschema = new mongoose.Schema({
    firmname: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true
    },
    category: [
        {
            type: String,
            enum: ['veg', 'nonVeg']
        }
    ],
    region: [
        {
            type: String,
            enum: ['southindian', 'northindian', 'chinnese', 'bakery']
        }
    ],
    image: {
        type: String
    },
    offer: {
        type: String
    },
    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
        }
    ],

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});



const Firm = mongoose.model('Firm', firmschema);

module.exports = Firm;
