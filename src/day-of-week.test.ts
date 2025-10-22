import { findDayOfWeek } from './day-of-week'
import { datesInYear1900, datesInYear2000, datesInYear2020, datesInYear2025 } from './test-data.test'

const Weekday = { Su: 0, Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6 }

describe('sakomotoDayOfWeek', () => {
  test('Sanity', () => {
    expect(findDayOfWeek(2025, 10, 21)).toEqual(Weekday['Tu'])
  })

  test('The last day of the year is immediately followed by the first day of the next year', () => {
    // chosen at random
    for (const year of [1999, 2000, 2001, 2019, 2020, 2021, 2025, 2026]) {
      expect(findDayOfWeek(year + 1, 1, 1)).toEqual((findDayOfWeek(year, 12, 31) + 1) % 7)
    }
  })

  test('All dates in a regular non-leap-year produce the same day of the week as cal outputs', () => {
    const dates = datesInYear2025
    for (const date of dates) {
      const year = Number(date.date.slice(0, 4)!)
      const month = Number(date.date.slice(5, 7)!)
      const day = Number(date.date.slice(8, 10)!)
      const actual = findDayOfWeek(year, month, day)
      expect(actual).toEqual(Weekday[date.dayOfWeek])
    }
  })

  describe('Leap Years', () => {
    test('All dates in a regular leap-year produce the same day of the week as cal outputs', () => {
      const dates = datesInYear2020
      for (const date of dates) {
        const year = Number(date.date.slice(0, 4)!)
        const month = Number(date.date.slice(5, 7)!)
        const day = Number(date.date.slice(8, 10)!)
        const actual = findDayOfWeek(year, month, day)
        expect(actual).toEqual(Weekday[date.dayOfWeek])
      }
    })

    test('All dates in an exempt leap-year (divisible by 4 and 100 but not 400) produce the same day of the week as cal outputs', () => {
      const dates = datesInYear1900
      for (const date of dates) {
        const year = Number(date.date.slice(0, 4)!)
        const month = Number(date.date.slice(5, 7)!)
        const day = Number(date.date.slice(8, 10)!)
        const actual = findDayOfWeek(year, month, day)
        expect(actual).toEqual(Weekday[date.dayOfWeek])
      }
    })

    test('All dates in a leap year divisible by 400 produce the same day of the week as cal outputs', () => {
      const dates = datesInYear2000
      for (const date of dates) {
        const year = Number(date.date.slice(0, 4)!)
        const month = Number(date.date.slice(5, 7)!)
        const day = Number(date.date.slice(8, 10)!)
        const actual = findDayOfWeek(year, month, day)
        expect(actual).toEqual(Weekday[date.dayOfWeek])
      }
    })
  })

  test('Days of the week are only supported (in this library) for the gregorian calendar, specifically from the point when London adopted it', () => {
    expect(findDayOfWeek(1753, 1, 1)).toEqual(Weekday['Mo'])
    expect(() => findDayOfWeek(1752, 12, 31)).toThrow()
  })
})
