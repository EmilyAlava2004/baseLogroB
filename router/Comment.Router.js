import express from 'express';
import {saveComment, getComments} from '../controller/CommentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
router.post('/comment', verifyToken, saveComment);
router.get('/comments/:id', getComments);
export const RouterComment = router;

