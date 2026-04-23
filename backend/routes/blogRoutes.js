import { Router } from 'express';


import {getBlogs, getAllBlogs,  getBlogById, createBlog, updateBlog, deleteBlog} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from "../middleware/upload.js";

// router.post("/", upload.single("image"), createBlog);

const router = Router();

router.get('/',        getBlogs);           // public — published only
router.get('/all',     protect, getAllBlogs); // admin — all posts
router.get('/:id',     protect, getBlogById); // admin — single post by ID
router.post('/',       protect, upload.single("image"), createBlog);
router.put('/:id',     protect,upload.single("image"), updateBlog); //if image is included, it will be handled in controller
router.delete('/:id',  protect, deleteBlog);

export default router;