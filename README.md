# London Time

![Node.js CI](https://github.com/alexswilliams/london-time/workflows/Node.js%20CI/badge.svg)

A library to shift dates and times between UTC and London, without relying on other APIs or Libraries (i.e. no Intl, no Moment, etc)

### Why would you want this?

- You are writing software that needs to refer to objects specifically in London, regardless of where in the world the user is.
- You can't use `moment` or moment's timezone library, and the `Intl` APIs don't work for you.
- You want a shallower dependency tree.

### Why was this written?

Because I keep finding myself staring at an API that:

- accepts UTC-timestamps, but the user has chosen a date in London
- returns UTC-timestamps, but the page needs to display that in London time
- accepts a London-oriented date, but the last API or library call gave me back a UTC-timestamp
- returns a London-oriented date, but the next API or library call needs a UTC-timestamp

In all these cases, the objects being described were resident in London even though the user might not be; so browser time isn't useful.

So this library appeared.

### What can this do?

- UTC instant to London date
- _(TODO)_ UTC instant to London date-time
- _(TODO)_ London date to UTC instant
- _(TODO)_ London date-time to UTC instant
- _(TODO)_ Formatting of dates and instants

### What can't this do?

- Determining leap years and days of week earlier than when London transitioned to the Gregorian calendar (1752).
- Determining anything relating to summer time earlier than 1997 because of too high a cost vs the benefit of supporting it (for now).
- The ambiguous ISO-8601 formats.
- Anything to do with leapseconds, other than not validating them - i.e. you can pass in :60 as a valid second component and this library won't complain.
- Periods or durations, or any sort of date diffing.
