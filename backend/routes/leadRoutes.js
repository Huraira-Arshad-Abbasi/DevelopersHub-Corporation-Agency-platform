import { Router } from 'express';
import {submitLead, getLeads, updateLeadStatus, deleteLead} from '../controllers/leadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/',              submitLead);               // public
router.get('/',               protect, getLeads);        // admin
router.patch('/:id/status',   protect, updateLeadStatus); // admin
router.delete('/:id',         protect, deleteLead);      // admin

export default router;