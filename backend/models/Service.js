import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  icon:        { type: String },          // store icon name e.g. "code", "design"
  isActive:    { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);