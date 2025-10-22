import { daysInMonth } from './leap-years';
export function utcInstantToParts(utcInstant) {
    var _a, _b;
    // https://en.wikipedia.org/wiki/ISO_8601
    // Acceptable formats:
    // - 20251009T093500
    // - 20251009T093500Z
    // - 20251009T093500.000  (fraction can be to any precision)
    // - 20251009T093500.000Z
    // - 2025-10-09T09:35:00
    // - 2025-10-09T09:35:00Z
    // - 2025-10-09T09:35:00.000  (fraction can be to any precision)
    // - 2025-10-09T09:35:00.000Z
    // Purposefully out of scope (for simplicity):
    // - week dates (e.g. 2025-W47-3 or 2025W473)
    // - non-zero offsets (or -0 offsets)
    // - ordinal dates (e.g. 2025-282 or 2025282)
    // - partial years (e.g. 25-10-09)
    // - times omitting T prefix (e.g. 20251009093500)
    // - times omitting minutes and seconds (because e.g. T10:59.5 becomes T10:59:30 which is not immediately obvious)
    const rx = /(?<year>[0-9]{4})-?(?<month>[0-9]{2})-?(?<day>[0-9]{2})T(?<hour>[0-9]{2}):?(?<minute>[0-9]{2}):?(?<second>[0-9]{2})(?<rest>.*)/;
    const matches = (_a = utcInstant.match(rx)) === null || _a === void 0 ? void 0 : _a.groups;
    if (!matches)
        throw Error(`Error parsing UTC Instant: ${utcInstant}`);
    const parts = {
        year: +matches.year,
        month: +matches.month,
        day: +matches.day,
        hour: +matches.hour,
        minute: +matches.minute,
        second: +matches.second,
        fractional: '',
    };
    if (matches.rest) {
        const restGroups = (_b = matches.rest.match(/(?<frac>\.[0-9]+)?(Z|\+00:?00|\+00)?^/)) === null || _b === void 0 ? void 0 : _b.groups;
        if (!restGroups)
            throw Error(`Error parsing UTC Instant: ${utcInstant}, specifically ${matches.rest}`);
        if (restGroups.frac)
            parts.fractional = restGroups.frac;
    }
    if (parts.month < 1 || parts.month > 12 || parts.day < 0 || parts.hour > 23 || parts.minute > 59 || parts.second > 60)
        throw Error(`Error parsing UTC Instant: ${utcInstant}, component is impossible`);
    if (parts.day > daysInMonth(parts.year, parts.month))
        throw Error(`Error parsing UTC Instant: ${utcInstant}, ${parts.year}-${parts.month} does not have a day ${parts.day}`);
    return parts;
}
//# sourceMappingURL=parse.js.map