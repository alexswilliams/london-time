import { isLeapYear } from './leap-years'

describe('Is Leap Year', () => {
  test('Leap years are only supported (in this library) for the gregorian calendar, specifically from the point when London adopted it', () => {
    expect(isLeapYear(1756)).toEqual(true)
    expect(isLeapYear(1755)).toEqual(false)
    expect(isLeapYear(1754)).toEqual(false)
    expect(isLeapYear(1753)).toEqual(false)
    // I think 1752 was a leap year.  Timeline:
    // 1750:  starts 25th March 1750,
    //        carries on 31st Dec 1750 into 1st Jan 1750
    //        carries on 28th Feb 1750 into 1st Mar 1750
    //        ends 24th March 1750; the following day is 25th March 1751
    // 1751:  starts 25th March 1751
    //        ends 31st Dec 1751 (so it was a really short year), the following day is 1st Jan 1752
    //        notably, 1751 has no January or February, and only has days in March >= 25
    // 1752:  starts 1st Jan 1752
    //        fits all the rules for a leap year, so should have had a Feb 29th - BUT DID IT?
    //        2nd Sep 1752 transitions directly to 14th Sep 1752
    //        ends 31st Dec 1752
    // So the Feb that should have had a 29th might not, depending on exactly how the Act was defined.
    // The act (https://www.legislation.gov.uk/apgb/Geo2/24/23/data.pdf) specifically starts off by saying
    // the start of the year "differs from ... the common usage throughout the whole kingdom", which
    // might suggest that it depends on who you ask.  It doesn't explicitly say anything about Feb 1752,
    // but it does state that every 4th year (etc) from 1750 will be a leap year, and doesn't provide
    // any exceptions.  So it seems safe to assume it was.

    // So this needs changing to true, and the rules before 1750 need changing.
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
