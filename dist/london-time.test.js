"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const london_time_1 = require("./london-time");
describe('utcTimestampToLondonDate', () => {
    test('Sanity', () => {
        expect((0, london_time_1.utcTimestampToLondonDate)('2025-09-30T23:30:00.000Z')).toEqual('2025-10-01');
    });
});
describe('utcTimestampToLondonDateTime', () => {
    test('Sanity', () => {
        expect((0, london_time_1.utcTimestampToLondonDateTime)('2025-09-30T23:30:00.000Z')).toEqual('2025-10-01T00:30:00.000');
    });
});
