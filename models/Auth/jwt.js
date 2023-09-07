// routes/admin.js
import express from 'express';
import authenticate from '../Auth/auth.js';

const router = express.Router();

// Protected route that requires authentication
router.get('/protected', authenticate, (req, res) => {
  // Only authenticated admins can access this route
  res.status(200).json({ message: 'You have access to this protected route.' });
});

export default router;
