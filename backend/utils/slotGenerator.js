import Availability from "../models/Availability.js";
import Slot from "../models/Slot.js";
import { timeOverlap } from "./timeOverlap.js";
import { getDayOfWeek, minuteToTime, timeToMinute } from "./time.js";

export const generateSlots = async({ userId, service, date }) => {
    const dayOfWeek = getDayOfWeek(date);
    const availability = await Availability.findOne({ userId, dayOfWeek });

    if (!availability || availability.slot.lenght == 0) {
        return [];
    }

    const bookings = await Booking.find({
        userId,
        date,
        $or: [
            { status: 'confirmed' },
            {
                status: 'confirmed',
                createdAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) }
            },
        ],
    });
    const slots = [];
    availability.slots.forEach((window) => {

    })
}