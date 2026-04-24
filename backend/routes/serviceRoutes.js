import { Router } from 'express';
import {getServices, getAllServices, getServiceById, createService, updateService, deleteService} from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/',     getServices);
router.get('/all',  protect, getAllServices);
router.get('/:id',  getServiceById);
router.post('/',    protect, createService);
router.put('/:id',  protect, updateService);
router.delete('/:id', protect, deleteService);

export default router;