// routes/admin.js
import express from 'express';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register a new admin
router.post('/register', async (req, res) => {
    const uniqueId = Math.random().toString(36).substring(2, 10);
    const { adminName, email, phoneNumber, password } = req.body;
  
    try {
      // Check if an admin with the provided email or phone number already exists
      const existingAdmin = await Admin.findOne({
        $or: [{ email }, { phoneNumber }],
      });
  
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin with this email or phone number already exists' });
      }
  
      // Create a new admin record
      const newAdmin = new Admin({
        adminName,
        email,
        phoneNumber,
        password,
        uniqueId
      });
  
      await newAdmin.save();
  
      res.status(201).json({ message: 'Admin registration successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

// Login route
router.post('/login', async (req, res) => {
  const { email, password , phoneNumber } = req.body;

  try {
    // Find the admin by email or phone number
    const admin = await Admin.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Here, you should compare the provided password with the stored password hash
    // You should use a library like bcrypt for secure password storage and comparison
    // For demonstration purposes, we're comparing the plain text password
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login
    const key = 'email';
    const token = jwt.sign({key}, "jwt-secret-key", {expiresIn: '2d'});
    return res.status(200).json({ message: 'Login successful', token:token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});



export default router;
