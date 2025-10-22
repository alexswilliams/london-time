const SAKAMOTO_ADJUSTMENTS = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
// https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Sakamoto's_methods
export function findDayOfWeek(year, month, day) {
    if (year <= 1752)
        throw RangeError('Years before the adoption of the Gregorian calendar in London are not supported');
    year = month <= 2 ? year - 1 : year;
    const yearStride = (year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400)) % 7;
    const weekdayBeforeStartOfMonth = (yearStride + SAKAMOTO_ADJUSTMENTS[month - 1]) % 7;
    return (weekdayBeforeStartOfMonth + day) % 7;
}
//# sourceMappingURL=day-of-week.js.map