const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    isDeleted : { type: Boolean, default: false },
    expirationDate :{ type: Date}
    
  });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
