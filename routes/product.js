// routes/product.js
import express from 'express';
import Product from '../models/Product.js';
import { DateTime } from 'luxon';

const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
  const lastProduct = await Product.findOne().sort({ productId: -1 });
  const productId = lastProduct ? lastProduct.productId + 1 : 1;

  // Get current IST date and time in the desired format
  const dateAdded = DateTime.now()
  .setZone('Asia/Kolkata')

  const {
    category,
    name,
    purchasedPrice,
    salesPrice,
    quantity,
  } = req.body;

  try {
    const newProduct = new Product({
      productId,
      category,
      name,
      dateAdded,
      purchasedPrice,
      salesPrice,
      quantity,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:productId', async (req, res) => {
  const { productId }  = req.params;
  try {
    const product = await Product.findOne({productId: productId});
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product by ID
router.put('/:productId', async (req, res) => {
  const {
    category,
    name,
    productId,
    purchasedPrice,
    salesPrice,
    quantity,
  } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        category,
        name,
        purchasedPrice,
        salesPrice,
        quantity,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product by ID
router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    await Product.findByIdAndRemove(productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
