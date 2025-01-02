import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', adminAuth, updateSettings);

export default router;