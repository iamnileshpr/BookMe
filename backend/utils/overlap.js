import { timeToMinute } from "./time.js";

export const timeOverlap = (firstStart, firstEnd, secondStart, secondEnd) => {
    return timeToMinute(firstStart) < timeToMinute(secondEnd) && timeToMinute(secondStart) < timeToMinute(secondEnd);
}