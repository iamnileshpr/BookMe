const toGoogleDateTime = (date, time) => {
    // Strips dashes from date and colons from time, then adds seconds '00'
    return `${date.replaceAll('-', '')}T${time.replace(':', '')}00`;
}

export const buildCustomerCalendarLink = ({ buiness, service, booking }) => {
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: `${service.name} with ${(buiness.name || buiness.buinessName)}`,
        dates: `${toGoogleDateTime(booking.date, booking.startTime)}/${toGoogleDateTime(booking.date, booking.endTime)}`,
        details: booking.notes || `Booking with ${buiness.buinessName || buiness.name}`,
    });

    return `https://google.com{params.toString()}`;
}

export default buildCustomerCalendarLink;