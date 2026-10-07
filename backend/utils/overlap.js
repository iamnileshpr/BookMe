import { timeToMinute } from "./time";

export const timeOverlap = (firstStart, firstEnd, secondStart, secondEnd) => {
    return timeToMinute(firstStart) < timeToMinute(secondEnd) && timeToMinute(secondStart) < timeToMinute(firstEnd);
}