const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the product schema
const productSchema = new Schema({
    image: { type: String, required: true },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true }
  });
// Create the product model
const Product = mongoose.model('Product', productSchema);

// Export the product model
module.exports = Product;
