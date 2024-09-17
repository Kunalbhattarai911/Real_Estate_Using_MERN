import express from 'express';
import { updateUserInfo } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/user.isAuthenticated.js';
import { updateUserProfile } from '../validation/userUpdateProfile.validation.js';

const router = express.Router();

router.put("/update",isAuthenticated, updateUserProfile ,updateUserInfo);

export default router;