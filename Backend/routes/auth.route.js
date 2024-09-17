import express from 'express';
import { login, signup } from '../controllers/auth.controller.js';
import { authLogin, authSignup } from '../validation/auth.validation.js';

const router = express.Router();

router.post("/signup" ,authSignup, signup);
router.post("/login", authLogin, login)

export default router;