---
sidebar_label: Dates
sidebar_position: 3
---

# Dates

## Get the Current Date

```js
const today = new Date();

console.log(today.getFullYear()); // example: 2021
console.log(today.getMonth()); // example: 02 (March)
console.log(today.getDay()); // example: 01 (Monday)
```

```js
// Create a new date

// February 1, 2021, at 9:30 AM:
const anotherDay = new Date(2021, 1, 1, 9, 30);
```

| Method            | Gets                                      | Possible values                     |
| ----------------- | ----------------------------------------- | ----------------------------------- |
| getFullYear()     | The year A four-digit number like         | 2021                                |
| getMonth()        | The month number                          | 0 to 11, where 0 represents January |
| getDate()         | The day of the month                      | 1 to 31                             |
| getDay()          | The day of the week                       | 0 to 6, where 0 represents Sunday   |
| getHours()        | The hour of the day                       | 0 to 23                             |
| getMinutes()      | The minute                                | 0 to 59                             |
| getSeconds()      | The seconds                               | 0 to 59                             |
| getMilliseconds() | The milliseconds (one thousandth seconds) | 0 to 999                            |

## Converting a String to a Date Object

```js
const eventDate = new Date("2021-12-17T03:24:00Z");
```

## Adding Days to a Date

```js
const today = new Date();
const currentDay = today.getDate(); // 1-31
// Where will be three weeks in the future?
today.setDate(currentDay + 21);
console.log(`Three weeks from today is ${today}`);
```

Can be positive to move foreward or negative to move backwards

|             |
| ----------- |
| setDate()   |
| setMonths() |
| setHours()  |

## Comparing Dates and Testing Dates for Equality

```js
const oldDay = new Date(1999, 10, 20);
const newerDay = new Date(2021, 1, 1);
if (newerDay > oldDay) {
  // This is true, because newerDay falls after oldDay.
}
```

Note: You cannot check for equality as it checks the object reference.

```js
const date1 = new Date(2021, 1, 1);
const date2 = new Date(2021, 1, 1);
// This is false, because they are different objects
console.log(date1 === date2);
// This is true, because they have the same date
console.log(date1.getTime() === date2.getTime());
```

## Calculating the Time Elapsed Between Two Dates

```js
const oldDate = new Date(2021, 1, 1);
const newerDate = new Date(2021, 1, 10);
const differenceInMilliseconds = newerDate - oldDate; // 777600000
const millisecondsPerDay = 1000 * 60 * 60 * 24;
let differenceInDays = differenceInMilliseconds / millisecondsPerDay; // 9
```

## Formatting a Date Value as a String

```js
const now = new Date();

now.toISOString(); // '2024-04-20T21:14:28.426Z'
now.toUTCString(); // 'Sat, 20 Apr 2024 21:14:28 GMT'
now.toLocaleString(); // '4/20/2024, 11:14:28 PM'

new Intl.DateTimeFormat("en-GB").format(now); // '20/04/2024'
```
