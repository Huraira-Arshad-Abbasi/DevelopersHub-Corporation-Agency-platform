import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  slug:     { type: String, required: true, unique: true },  // auto-generated from title
  author:   { type: String, default: 'Admin' },  // just a string
  tags:     [{ type: String }],
  imageUrl: { type: String },
  status:   { type: String, enum: ['draft', 'published'], default: 'draft' }
  // removed separate date field — use createdAt from timestamps
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
