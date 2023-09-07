// models/Admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstLogin: {
    type: Date
  },
  lastLogin: {
    type: Date,
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true, // Ensure unique admin IDs
    trim: true,
  }
});

const Admin = mongoose.model('admin', adminSchema);

export default Admin;
