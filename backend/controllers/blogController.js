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

// GET /api/Blog/:id (admin — single post by ID)
const getBlogById = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id);
    
    if (!blog) return res.status(404).json({ message: 'blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// POST /api/blog  (admin)
const createBlog = async (req, res) => {
  try {
    const { title, content, slug, author, tags, status } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!title || !content)
      return res.status(400).json({ message: 'Title and content required' });

    const newslug =  slug || slugify(title);
    const exists = await Blog.findOne({ slug: newslug });
    if (exists) return res.status(400).json({ message: 'A post with this slug already exists' });

    const blog = await Blog.create({
      title,
      content,
      slug: newslug,
      author,
      tags,
      status,
      imageUrl,
    });
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
     const blog = await Blog.findById(req.params.id);

     if (!blog) return res.status(404).json({ message: "Blog not found" });
     // 🔥 Only update image if new file uploaded
    if (req.file) {
      blog.imageUrl = req.file.path;
    }

    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.slug = req.body.slug;
    blog.tags = req.body.tags;
    blog.status = req.body.status;
    
    await blog.save();
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

export { getBlogs, getAllBlogs, getBlogById , createBlog, updateBlog, deleteBlog };