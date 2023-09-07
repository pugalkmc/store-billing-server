// routes/sale.js
import express from 'express';
import Sale from '../models/Sale.js';

const router = express.Router();

// Create a new sale
router.post('/', async (req, res) => {
  const { customerNumber, products } = req.body;

  try {
    const sale = new Sale({
      customerNumber,
      saleID: generateUniqueSaleID(), // Implement a function to generate a unique sale ID
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      products,
    });

    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get sale details by sale ID
router.get('/:saleId', async (req, res) => {
  console.log(req)
  console.log("Entered")
  const { saleId } = req.params;

  try {
    const sale = await Sale.findOne({ saleId:saleId });
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Sale.findOne({ productId });
    if (!productId) {
      return res.status(404).json({ message: 'productId not found' });
    }
    res.status(200).json(productId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// List all saleIds
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
