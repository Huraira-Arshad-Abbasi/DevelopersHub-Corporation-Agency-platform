import { Router } from 'express';
import {getPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio} from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/',     getPortfolios);
router.get('/:id',  getPortfolioById);
router.post('/',    protect, createPortfolio);
router.put('/:id',  protect, updatePortfolio);
router.delete('/:id', protect, deletePortfolio);

export default router;