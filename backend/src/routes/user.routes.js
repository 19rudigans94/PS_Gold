import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import { validate, userValidation, validateId } from '../middleware/validation.middleware.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfile,
  getProfile
} from '../controllers/user.controller.js';

const router = express.Router();

// Публичные маршруты
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Маршруты администратора
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, validateId, getUserById);
router.put('/:id', 
  protect, 
  admin, 
  validateId,
  validate(userValidation),
  updateUser
);
router.delete('/:id', protect, admin, validateId, deleteUser);

export default router;
