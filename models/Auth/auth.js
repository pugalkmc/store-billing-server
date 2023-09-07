// Auth/auth.js
import jwt from './jwt.js';

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token'); // You can choose any header key you like
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.admin = decoded; // You can access the admin ID in protected routes
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authenticate;
