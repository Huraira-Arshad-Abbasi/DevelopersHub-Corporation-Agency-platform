import { Router } from 'express';
import {bookMeeting, getMeetings, updateMeetingStatus, deleteMeeting} from '../controllers/meetingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/',             bookMeeting);                 // public
router.get('/',              protect, getMeetings);         // admin
router.patch('/:id/status',  protect, updateMeetingStatus); // admin
router.delete('/:id',        protect, deleteMeeting);       // admin
export default router;