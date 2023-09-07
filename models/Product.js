// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    unique:false
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateAdded: {
    type: Date,
    required: true,
  },
  purchasedPrice: {
    type: Number,
    required: true,
  },
  salesPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('products', productSchema);

export default Product;
