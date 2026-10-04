import express from 'express';
import { getMe, loginUser, registerUser, requestRegisterOtp, updateProfile, verifyRegistrationOtp } from '../controller/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/register/request-otp', requestRegisterOtp);
router.post('/register/verify-otp', verifyRegistrationOtp);
router.post('/login', loginUser);
router.post('/me', auth, getMe);
router.post('/profile', auth, updateProfile);

export default router;