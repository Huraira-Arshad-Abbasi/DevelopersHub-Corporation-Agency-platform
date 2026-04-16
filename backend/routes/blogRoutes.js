import { Router } from 'express';

import {getBlogs, getAllBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/',        getBlogs);           // public — published only
router.get('/all',     protect, getAllBlogs); // admin — all posts
router.get('/:slug',   getBlogBySlug);      // public — single post
router.post('/',       protect, createBlog);
router.put('/:id',     protect, updateBlog);
router.delete('/:id',  protect, deleteBlog);

export default router;