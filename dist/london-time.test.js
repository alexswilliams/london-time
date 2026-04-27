"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const london_time_1 = require("./london-time");
(0, vitest_1.describe)('utcTimestampToLondonDate', () => {
    (0, vitest_1.test)('Sanity', () => {
        (0, vitest_1.expect)((0, london_time_1.utcTimestampToLondonDate)('2025-09-30T23:30:00.000Z')).toEqual('2025-10-01');
    });
});
(0, vitest_1.describe)('utcTimestampToLondonDateTime', () => {
    (0, vitest_1.test)('Sanity', () => {
        (0, vitest_1.expect)((0, london_time_1.utcTimestampToLondonDateTime)('2025-09-30T23:30:00.000Z')).toEqual('2025-10-01T00:30:00.000');
    });
});
