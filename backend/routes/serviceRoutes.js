import express from 'express';
import { createService, deleteService, listService, updateService } from '../controller/serviceController.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', listService);
router.post('/', auth, createService);
router.put('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);

export default router;