import express from 'express';
import { getPaymentOverview, requestWithdrawal, updatePayoutDetails } from '../controller/paymentController.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', auth, getPaymentOverview);
router.get('/payout-details', auth, updatePayoutDetails);
router('/withdrawls', auth, requestWithdrawal)

export default router;