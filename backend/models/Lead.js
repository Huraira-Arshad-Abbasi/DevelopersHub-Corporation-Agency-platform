import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name:               { type: String, required: true },
  email:              { type: String, required: true },
  phone:              { type: String },
  serviceInterested:  { type: String },   // just store as text
  details:            { type: String, required: true },
  status:             { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);