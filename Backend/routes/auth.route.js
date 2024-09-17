import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { authSignup } from '../validation/auth.validation.js';

const router = express.Router();

router.post("/signup" ,authSignup, signup);

export default router;