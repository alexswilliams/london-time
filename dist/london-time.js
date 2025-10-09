'use strict';
import { sakamotoDayOfWeek } from './day-of-week';
import { daysInMonth } from './leap-years';
import { utcInstantToParts } from './parse';
export function utcTimestampToLondonDate(utcInstant) {
    if (typeof utcInstant !== 'string')
        throw TypeError('UTC Timestamp must be a string');
    const parts = utcInstantToParts(utcInstant);
    const utcToday = `${parts.year}-${zeroPad(parts.month)}-${zeroPad(parts.day)}`;
    const isDst = isUtcInstantInLondonDST(parts.year, parts.month, parts.day, parts.hour);
    if (!isDst)
        return utcToday;
    if (isDst && parts.hour < 23)
        return utcToday;
    return datePlusOneDay(parts.year, parts.month, parts.day);
}
function zeroPad(part) {
    return part <= 9 ? `0${part}` : String(part);
}
function isUtcInstantInLondonDST(utcYear, utcMonth, utcDay, utcHour) {
    // in a month with no discontinuity
    if (utcMonth < 3 || utcMonth > 10)
        return false;
    if (utcMonth > 3 || utcDay < 10)
        return true;
    const dayOfWeek = sakamotoDayOfWeek(utcYear, utcMonth, utcDay);
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
    const newDay = (day % daysInMonth(year, month)) + 1;
    if (newDay !== 1)
        return `${year}-${zeroPad(month)}-${zeroPad(newDay)}`;
    const newMonth = (month % 12) + 1;
    if (newMonth !== 1)
        return `${year}-${zeroPad(newMonth)}-01`;
    const newYear = year + 1;
    return `${newYear}-01-01`;
}
//# sourceMappingURL=london-time.js.map