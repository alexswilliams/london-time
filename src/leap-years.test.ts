import { isLeapYear } from './leap-years'

describe('Is Leap Year', () => {
  test('Leap years are only supported (in this library) for the gregorian calendar, specifically from the point when London adopted it', () => {
    expect(isLeapYear(1756)).toEqual(true)
    expect(isLeapYear(1755)).toEqual(false)
    expect(isLeapYear(1754)).toEqual(false)
    expect(isLeapYear(1753)).toEqual(false)
    // I genuinely don't know if 1752 counts as a leap year in London - it was in other countries,
    //  but was it in London given the switchover was in October, but also we deleted a load
    //  of days that year?  Throwing seems safer than answering true or false.
    expect(() => isLeapYear(1752)).toThrow()
  })

  const allYears = Array.from(Array(2000).keys()).map(it => it + 1753)

  test('Years not divisible by 4, 100 or 400 are non-leap-years', () => {
    for (const year of [1755, 1901, 1999, 2021, 2025, 3050]) {
      expect(isLeapYear(year)).toEqual(false)
    }
    for (const year of allYears.filter(it => it % 4 !== 0 && it % 100 !== 0 && it % 400 !== 0)) {
      expect(isLeapYear(year)).toEqual(false)
    }
  })

  test('Years divisible by 4, but not by 100 or 400 are leap-years', () => {
    for (const year of [1756, 1904, 2008, 2020, 2028, 3052]) {
      expect(isLeapYear(year)).toEqual(true)
    }
    for (const year of allYears.filter(it => it % 4 === 0 && it % 100 !== 0 && it % 400 !== 0)) {
      expect(isLeapYear(year)).toEqual(true)
    }
  })

  test('Years divisible by 4 and by 100 but not by 400 are non-leap-years', () => {
    for (const year of [1800, 1900, 2100, 2200, 3100]) {
      expect(isLeapYear(year)).toEqual(false)
    }
    for (const year of allYears.filter(it => it % 4 === 0 && it % 100 === 0 && it % 400 !== 0)) {
      expect(isLeapYear(year)).toEqual(false)
    }
  })

  test('Years divisible by 4, by 100 and by 400 are leap-years', () => {
    for (const year of [2000, 2400, 2800, 3200]) {
      expect(isLeapYear(year)).toEqual(true)
    }
    for (const year of allYears.filter(it => it % 4 === 0 && it % 100 === 0 && it % 400 === 0)) {
      expect(isLeapYear(year)).toEqual(true)
    }
  })
})
