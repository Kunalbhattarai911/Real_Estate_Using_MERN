import express from 'express';
import { google, login, signup } from '../controllers/auth.controller.js';
import { authLogin, authSignup } from '../validation/auth.validation.js';

const router = express.Router();

router.post("/signup" ,authSignup, signup);
router.post("/login", authLogin, login);
router.post("/google", google);

export default router;