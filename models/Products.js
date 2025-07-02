const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: [
        {
            type: String,
            enum: ['veg', 'nonveg']
        }
    ],
    image: {
        type: String
    },
    description: {    // <-- fixed typo
        type: String
    },
    bestseller: {
        type: String
    },
    firm: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'firm'
        }
    ]
});

module.exports = mongoose.models.product || mongoose.model("product", productschema);
