const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: [String],
    enum: ['veg', 'Nonveg']
  },
  image: {
    type: String
  },
  bestSeller: {
    type: Boolean
  },
  description: {
    type: String
  },
  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firm'
  }
});

const Product = mongoose.models.Products || mongoose.model('Products', productSchema);

module.exports = Product;
