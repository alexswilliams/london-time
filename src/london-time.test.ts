import { utcTimestampToLondonDate, utcTimestampToLondonDateTime } from './london-time'

describe('utcTimestampToLondonDate', () => {
  test('Sanity', () => {
    expect(utcTimestampToLondonDate('2025-09-30T23:30:00.000Z')).toEqual('2025-10-01')
  })
})

describe('utcTimestampToLondonDateTime', () => {
  test('Sanity', () => {
    expect(utcTimestampToLondonDateTime('2025-09-30T23:30:00.000Z')).toEqual('2025-10-01T00:30:00.000')
  })
})
