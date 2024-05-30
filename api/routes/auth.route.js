import express from 'express';
import { getProfile, google, signin, signup } from '../controllers/auth.controller.js';
import { verifyToken } from '../utills/verifyUser.js';

const router = express.Router();
router.post("/signup",signup);
router.post("/signin",signin);
router.post('/google',google)
router.get('/profile',verifyToken,getProfile)
export default router;