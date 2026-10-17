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
        let cursor = timeToMinute(window.startTime);
        const endTime = timeToMinute(window.endTime);

        while (cursor + service.duration <= endTime) {
            const startTime = minuteToTime(cursor);
            const endTime = minuteToTime(cursor + service.duration);

            const hasConflict = bookings.some((booking) =>
                timeOverlap(startTime, endTime, booking.startTime, booking.endTime)
            );

            if (!hasConflict) {
                slots.push({ startTime, endTime });
            }

            cursor += service.duration;
        }
    })
    return slots;
}