import express from 'express';
import { google, login, signout, signup } from '../controllers/auth.controller.js';
import { authLogin, authSignup } from '../validation/auth.validation.js';

const router = express.Router();

router.post("/signup" ,authSignup, signup);
router.post("/login", authLogin, login);
router.post("/google", google);
router.get("/signout", signout)

export default router;