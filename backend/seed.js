import bcrypt from 'bcrypt';
import connectDB from './config/db.js';
import User from './models/User.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
  await connectDB();

  const existing = await User.findOne({ email: 'admin@agency.com' });
  if (existing) {
    console.log('Admin already exists');
    process.exit();
  }

  const hashed = await bcrypt.hash('admin123', 10);
  await User.create({
    name: 'Admin',
    email: 'admin@agency.com',
    password: hashed,
    role: 'admin'
  });

  console.log('Admin created: admin@agency.com / admin123');
  process.exit();
};

seed();