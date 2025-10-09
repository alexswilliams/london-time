const SAKAMOTO_ADJUSTMENTS = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
export function sakamotoDayOfWeek(yearIn, month, day) {
    const year = month <= 2 ? yearIn - 1 : yearIn;
    const yearStride = (year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400)) % 7;
    const weekdayBeforeStartOfMonth = (yearStride + SAKAMOTO_ADJUSTMENTS[month - 1]) % 7;
    return (weekdayBeforeStartOfMonth + day) % 7;
}
//# sourceMappingURL=day-of-week.js.map