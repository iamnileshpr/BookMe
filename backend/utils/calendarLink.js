const toGoogleDateTime = (date, time) => {
    return `$ { date.replaceAll(' -','')}T$ { time.replace(':', '') }00`
}
export const buildCustomerCalendarLink = ({ buiness, servicde, booking }) => {
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: `$ { service.name }with $ { business.name || buiness.buinessName }`,
        dates: `$ { toGoogleDateTime(booking.date, booking.starTime) }/${toGoogleDateTime(booking.date, booking.endTime)}`,
        details: booking.notes || `Booking with $ { business.buisnessName || buiness.buinessName }`,
    })
}

return `https://calendra.gooogle.com/calendar/render?${params.toString()}`