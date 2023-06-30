const {model, Schema} = require('mongoose')

// Define the product schema
const productSchema = new Schema({
    image: { type: String, required: true },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true }
  });

// Export the product model
module.exports = model('Product', productSchema)
