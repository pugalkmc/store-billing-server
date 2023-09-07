// models/Sale.js
import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  customerNumber: Number,
  saleId: {
    type: Number,
    unique: true, // Ensure sale IDs are unique
  },
  date: Date,
  time: String,
  products: [
    {
      productId: {
        type: Number,
        ref: 'Product', // Reference to the Product model
      },
      quantity: Number,
    },
  ],
});

const Sale = mongoose.model('sale', saleSchema);

export default Sale;
