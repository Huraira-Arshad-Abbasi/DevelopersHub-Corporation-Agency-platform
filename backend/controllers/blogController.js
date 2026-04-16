import Blog from '../models/Blog.js';

const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

// GET /api/blog  (public — only published)
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .select('-content')   // exclude heavy content from listing
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/blog/all  (admin — all including drafts)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().select('-content').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/blog/:slug  (public — single post by slug)
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });
    if (!blog) return res.status(404).json({ message: 'Post not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/blog  (admin)
const createBlog = async (req, res) => {
  try {
    const { title, content, author, tags, imageUrl, status } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: 'Title and content required' });

    const slug = slugify(title);
    const exists = await Blog.findOne({ slug });
    if (exists) return res.status(400).json({ message: 'A post with this title already exists' });

    const blog = await Blog.create({ title, content, slug, author, tags, imageUrl, status });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/blog/:id  (admin)
const updateBlog = async (req, res) => {
  try {
    // regenerate slug if title changed
    if (req.body.title) req.body.slug = slugify(req.body.title);

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: 'Post not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/blog/:id  (admin)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getBlogs, getAllBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };