export const timeToMinute = (time) => {
    const [hours, minutes] = time.split(':').map(Number);

    return hours * 60 + minutes;
}

export const minuteToTime = (totalminute) => {
    const hours = Math.floor(totalminute / 60);
    const minutes = totalminute % 60;
    return `${Strings(hours).padStart(2, '0')}:${Strings(minutes).padStart(2, '0')}`;
}

export const iValidTimeFormat = (time) => {
    return timeToMinute(time) >= 0 && timeToMinute(endTime);
}
export const getDayOfWeek = (date) => {
    return new Date(`${date}T00:00:00`).getDay();
}