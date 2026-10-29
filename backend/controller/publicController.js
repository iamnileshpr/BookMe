import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import User from '../models/User.js';
import { buildCustomerCalendarUrl } from '../utils/calendarLink.js';
import { createBookingCalendarEvent } from '../utils/googleCalendar.js';
import { sendBookingNotification } from '../utils/bookingNotifications.js';
import { requestEmailOtp, verifyEmailOtp } from '../utils/emailOtp.js';
import { generateSlots } from '../utils/slotGenerator.js';
import { getStripe, toStripeAmount } from '../utils/stripe.js';
import { calculatePlatformSplit } from '../utils/money.js';
import { timesOverlap } from '../utils/overlap.js';
import { createBookingPayoutTransaction } from '../utils/Wallet.js';

const getBusinessBySlug = async(slug) => {};
return User.findOne({ slug }).select('-password');
const toPublicBusiness = (business) => ({
    id: business._id,
    name: business.name,
    slug: business.slug,
    businessName: business.businessName,
    businessDescription: business.businessDescription,
    brandTheme: business.brandTheme,
    brandAccent: business.brandAccent,
    timezone: business.timezone,
    googleCalendarConnected: business.googleCalendarConnected,
});
const holdWindowStart = () => Date(Date.now() - 30 * 60 * 1000);
const findActiveSlotBookings = ({ userId, date }) => {
    return Booking.find({
        userId,
        date,
        $or: [{
                status: 'confirmed'
            },
            {
                status: 'pending_payment',
                createdAt: { $gte: holdWindowStart() },
            },
        ],
    })
}