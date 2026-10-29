import express from "express";
import { getGoogleConnectUrl, handleGoogleCallback } from '../controller/integrationController.js';
import auth from '../middleware/auth.js';
const router = express.Router();
router.get('/google/connect', auth, getGoogleConnectUrl);
router.get('/google/callback', auth, handleGoogleCallback);

export default router;