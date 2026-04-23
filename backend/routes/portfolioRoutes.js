import { Router } from 'express';
import {getPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio} from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from "../middleware/upload.js";

const router = Router();

router.get('/',     getPortfolios);
router.get('/:id',  getPortfolioById);
router.post('/',    protect, upload.single('image'),  createPortfolio);
router.put('/:id',  protect, upload.single('image'), updatePortfolio);
router.delete('/:id', protect, deletePortfolio);

export default router;