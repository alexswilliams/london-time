"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const day_of_week_1 = require("./day-of-week");
const test_data_test_1 = require("./test-data.test");
const Weekday = { Su: 0, Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6 };
(0, vitest_1.describe)('sakomotoDayOfWeek', () => {
    (0, vitest_1.test)('Sanity', () => {
        (0, vitest_1.expect)((0, day_of_week_1.findDayOfWeek)(2025, 10, 21)).toEqual(Weekday['Tu']);
    });
    (0, vitest_1.test)('The last day of the year is immediately followed by the first day of the next year', () => {
        // chosen at random
        for (const year of [1999, 2000, 2001, 2019, 2020, 2021, 2025, 2026]) {
            (0, vitest_1.expect)((0, day_of_week_1.findDayOfWeek)(year + 1, 1, 1)).toEqual(((0, day_of_week_1.findDayOfWeek)(year, 12, 31) + 1) % 7);
        }
    });
    (0, vitest_1.test)('All dates in a regular non-leap-year produce the same day of the week as cal outputs', () => {
        const dates = test_data_test_1.datesInYear2025;
        for (const date of dates) {
            const year = Number(date.date.slice(0, 4));
            const month = Number(date.date.slice(5, 7));
            const day = Number(date.date.slice(8, 10));
            const actual = (0, day_of_week_1.findDayOfWeek)(year, month, day);
            (0, vitest_1.expect)(actual).toEqual(Weekday[date.dayOfWeek]);
        }
    });
    (0, vitest_1.describe)('Leap Years', () => {
        (0, vitest_1.test)('All dates in a regular leap-year produce the same day of the week as cal outputs', () => {
            const dates = test_data_test_1.datesInYear2020;
            for (const date of dates) {
                const year = Number(date.date.slice(0, 4));
                const month = Number(date.date.slice(5, 7));
                const day = Number(date.date.slice(8, 10));
                const actual = (0, day_of_week_1.findDayOfWeek)(year, month, day);
                (0, vitest_1.expect)(actual).toEqual(Weekday[date.dayOfWeek]);
            }
        });
        (0, vitest_1.test)('All dates in an exempt leap-year (divisible by 4 and 100 but not 400) produce the same day of the week as cal outputs', () => {
            const dates = test_data_test_1.datesInYear1900;
            for (const date of dates) {
                const year = Number(date.date.slice(0, 4));
                const month = Number(date.date.slice(5, 7));
                const day = Number(date.date.slice(8, 10));
                const actual = (0, day_of_week_1.findDayOfWeek)(year, month, day);
                (0, vitest_1.expect)(actual).toEqual(Weekday[date.dayOfWeek]);
            }
        });
        (0, vitest_1.test)('All dates in a leap year divisible by 400 produce the same day of the week as cal outputs', () => {
            const dates = test_data_test_1.datesInYear2000;
            for (const date of dates) {
                const year = Number(date.date.slice(0, 4));
                const month = Number(date.date.slice(5, 7));
                const day = Number(date.date.slice(8, 10));
                const actual = (0, day_of_week_1.findDayOfWeek)(year, month, day);
                (0, vitest_1.expect)(actual).toEqual(Weekday[date.dayOfWeek]);
            }
        });
    });
    (0, vitest_1.test)('Days of the week are only supported (in this library) for the gregorian calendar, specifically from the point when London adopted it', () => {
        (0, vitest_1.expect)((0, day_of_week_1.findDayOfWeek)(1753, 1, 1)).toEqual(Weekday['Mo']);
        (0, vitest_1.expect)(() => (0, day_of_week_1.findDayOfWeek)(1752, 12, 31)).toThrow();
    });
});
