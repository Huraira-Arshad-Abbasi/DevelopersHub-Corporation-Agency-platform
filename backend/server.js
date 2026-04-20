import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

import userRoutes      from './routes/userRoutes.js';
import serviceRoutes   from './routes/serviceRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import blogRoutes      from './routes/blogRoutes.js';
import leadRoutes      from './routes/leadRoutes.js';
import meetingRoutes   from './routes/meetingRoutes.js';


const app = express();
dotenv.config();
connectDB();


app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// Routes
app.use('/api/auth',      userRoutes);
app.use('/api/services',  serviceRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blog',      blogRoutes);
app.use('/api/leads',     leadRoutes);
app.use('/api/meetings',  meetingRoutes);




// Health check
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});