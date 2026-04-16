import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String },
  imageUrl:     { type: String },
  technologies: [{ type: String }],   
  liveUrl:      { type: String }
}, { timestamps: true });

export default mongoose.model('Portfolio', portfolioSchema);