import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  clientName:  { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String },
  service:     { type: String },
  dateTime:    { type: Date, required: true },   // store as single Date, easier to sort/filter
  status:      { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  note:        { type: String }
}, { timestamps: true });

export default mongoose.model('Meeting', meetingSchema);