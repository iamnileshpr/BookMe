import express from 'express';
import { cancelPublicBookingPayment, createPublicBooking, getBookingStatus, getPublicBuisness, getPublicSlots, requestPublicBookingOtp, verifyPublicBookingOtp } from '../controller/publicController.js';

const router = express.Router();

router.get('/booking/status', getBookingStatus);
router.post('/booking/cancel-payment', cancelPublicBookingPayment)
router.get('/:slug', getPublicBuisness)
router.post('/:slug/request-otp', requestPublicBookingOtp)
router.get('/:slug/slots', getPublicSlots)
router.post('/:slug/verify-otp', verifyPublicBookingOtp)
router.post('/:slug/book', createPublicBooking)

export default router;