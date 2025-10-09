const LEAP_YEAR_MONTHS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const NON_LEAP_YEAR_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export function daysInMonth(year, month) {
    return (isLeapYear(year) ? LEAP_YEAR_MONTHS : NON_LEAP_YEAR_MONTHS)[month - 1];
}
export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
//# sourceMappingURL=leap-years.js.map