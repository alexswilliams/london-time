'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.utcTimestampToLondonDate = utcTimestampToLondonDate;
exports.utcTimestampToLondonDateTime = utcTimestampToLondonDateTime;
const day_of_week_1 = require("./day-of-week");
const leap_years_1 = require("./leap-years");
const parse_1 = require("./parse");
function utcTimestampToLondonDate(utcInstant) {
    const parts = (0, parse_1.utcInstantToParts)(utcInstant);
    const utcToday = `${parts.year}-${zeroPad(parts.month)}-${zeroPad(parts.day)}`;
    const isDst = isUtcInstantInLondonDST(parts.year, parts.month, parts.day, parts.hour);
    if (!isDst)
        return utcToday;
    if (isDst && parts.hour < 23)
        return utcToday;
    return datePlusOneDay(parts.year, parts.month, parts.day);
}
function utcTimestampToLondonDateTime(utcInstant) {
    const parts = (0, parse_1.utcInstantToParts)(utcInstant);
    const isDst = isUtcInstantInLondonDST(parts.year, parts.month, parts.day, parts.hour);
    if (!isDst)
        return utcInstant;
    return instantPlusOneHour(parts);
}
function instantPlusOneHour(parts) {
    if (parts.hour == 23)
        return datePlusOneDay(parts.year, parts.month, parts.day) + `T00:${zeroPad(parts.minute)}:${zeroPad(parts.second)}${parts.fractional}`;
    return `${parts.year}-${zeroPad(parts.month)}-${zeroPad(parts.day)}T${zeroPad(parts.hour + 1)}:${zeroPad(parts.minute)}:${zeroPad(parts.second)}${parts.fractional}`;
}
function zeroPad(part) {
    return part <= 9 ? `0${part}` : String(part);
}
function isUtcInstantInLondonDST(utcYear, utcMonth, utcDay, utcHour) {
    if (utcYear <= 1996)
        throw RangeError('Years before 1996 (when London aligned to the EU) are not supported (yet)');
    // in a month with no discontinuity
    if (utcMonth < 3 || utcMonth > 10)
        return false;
    if (utcMonth > 3 || utcDay < 10)
        return true;
    const dayOfWeek = (0, day_of_week_1.findDayOfWeek)(utcYear, utcMonth, utcDay);
    // have not yet reached last week of month
    if (utcMonth === 3 && utcDay - dayOfWeek < 25)
        return false;
    if (utcMonth === 10 && utcDay - dayOfWeek < 25)
        return true;
    // have passed last sunday of month
    if (utcMonth === 3 && dayOfWeek > 0)
        return true;
    if (utcMonth === 10 && dayOfWeek > 0)
        return false;
    if (utcMonth === 3 && utcHour < 1)
        return false; // last sunday in march and before DST activates
    if (utcMonth === 10 && utcHour >= 1)
        return false; // last sunday in october and after DST deactivates
    return true; // last sunday of month and DST is active
}
function datePlusOneDay(year, month, day) {
    const newDay = (day % (0, leap_years_1.daysInMonth)(year, month)) + 1;
    if (newDay !== 1)
        return `${year}-${zeroPad(month)}-${zeroPad(newDay)}`;
    const newMonth = (month % 12) + 1;
    if (newMonth !== 1)
        return `${year}-${zeroPad(newMonth)}-01`;
    const newYear = year + 1;
    return `${newYear}-01-01`;
}
