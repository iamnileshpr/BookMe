import express from "express"
import { listAvailability, createAvailability, updateAvailability, deleteAvailability } from "../controllers/availabilityController.js";
import auth from '../middleware/auth.js'
import { saveAvailability } from "../controller/availabilityController.js";

const router = express.Router();
router.get('/', auth, saveAvailability);
router.get('/', auth, listAvailability);

export default router;