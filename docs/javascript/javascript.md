---
sidebar_label: "JavaScript"
sidebar_position: 200
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Javascript

import JSLogo from "@site/static/img/JavaScript.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

<DisplayLogo logo={JSLogo} />

## Strings

### Validate a non empty string

```js
const str = "Hello World";
if (typeof str === "string" && str.trim().length > 0) {
  console.log(str + " is a valid string");
}
```

### Convert number to string

```js
const someNumber = 12.984754;

console.log(someNumber.toFixed(3)); // "12.985"
console.log(someNumber + ""); // "12.984754"
```

### String Literals

```js
const literal = "Hello World";

console.log(`This is your string: ${literal}`); // This is your string: Hello World
```

### Check that string match

```js
const a = "hello";
const b = "HELLO";

if (a.toLowerCase() === b.toLowerCase()) {
  // We end up here, because the lowercase versions of both strings match
}
```

use sensitivity: 'accent' to check that a === á is false

use sensitivity: 'base' to check that a === á is true

```js
const nameA = "abc";
const nameB = "ábc";

if (nameA.localeCompare(nameB, undefined, { sensitivity: "base" }) === 0) {
  console.log("Names match");
}
```

### Check if substring exists

```js
const containsSubstring = (fullString, subString) => {
  if (fullString.includes(subString)) {
    console.log("Substring was found");
  }
};
```

### Replace

```js
const replaceAllString = (fullString, originalWord, replaceWord) => {
  console.log(fullString.replaceAll(originalWord, replaceWord));
};
```

### Turn String into an array

```js
const languages = "C, C++, Python, Javascript";
languages.split(","); //[ 'C', ' C++', ' Python', ' Javascript' ]
```

### Converting the First Letter of a String to Uppercase

```js
const original = "if you cut an orange, there is a risk it will orbisculate.";
const fixed = original[0].toUpperCase() + original.slice(1);
// fixed = 'If you cut an orange, there is a risk it will orbisculate.';
```

## Numbers

### Generating Random Numbers

```js
const random_number = Math.floor(Math.random() * 6) + 1;
console.log(random_number); // Generate a random number between 1 and 6
```

### Generating Cryptographically Secure Random Numbers

```js
const crypto = require("crypto").webcrypto;

const randomBuffer = new Uint32Array(1);
crypto.getRandomValues(randomBuffer);
const randomFraction = randomBuffer[0] / (0xffffffff + 1);
const randomNumber = Math.floor(randomFraction * 6) + 1;
console.log(randomNumber); // Generate a cryptographically secure random number between 1 and 6
```

### Rounding to a decimal

```js
const fraction = 123.45678;
const rounded = Math.round(fraction); // nearest integer
```

```js
// Round to decimal
const fraction = 123.45678;
const toRound = fraction * 10 ** 2;
let roundedNumber = Math.round(toRound);
roundedNumber = roundedNumber / 10 ** 2; // 123.46
```

### Convert Number to String

```js
const stringNumber = "123.45";
const number = Number(stringNumber);

if (stringNumber.trim() !== "") {
  // all whitespace
  console.log("Safe to process this data as a number");
}

if (!Number.isNaN(number)) {
  console.log("Safe to process this data as a number");
}
```

## Dates

### Get the Current Date

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

### Converting a String to a Date Object

```js
const eventDate = new Date("2021-12-17T03:24:00Z");
```

### Adding Days to a Date

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

### Comparing Dates and Testing Dates for Equality

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

### Calculating the Time Elapsed Between Two Dates

```js
const oldDate = new Date(2021, 1, 1);
const newerDate = new Date(2021, 1, 10);
const differenceInMilliseconds = newerDate - oldDate; // 777600000
const millisecondsPerDay = 1000 * 60 * 60 * 24;
let differenceInDays = differenceInMilliseconds / millisecondsPerDay; // 9
```

### Formatting a Date Value as a String

```js
const now = new Date();

now.toISOString(); // '2024-04-20T21:14:28.426Z'
now.toUTCString(); // 'Sat, 20 Apr 2024 21:14:28 GMT'
now.toLocaleString(); // '4/20/2024, 11:14:28 PM'

new Intl.DateTimeFormat("en-GB").format(now); // '20/04/2024'
```

## Arrays

### Checking If an Object Is an Array

```js
const languages = ["C", "Python", "JavaScript"];
if (Array.isArray(languages)) {
  // languages is an array
}
```

### Checking length of an array

```js
const languages = ["C", "Python", "JavaScript"];
languages.length; // 3
```

### Iterating Over an Array

```js
const languages = ["C", "Python", "JavaScript"];

for (const lan of languages) {
  console.log(lan);
}
```

```js
const languages = ["C", "Python", "JavaScript"];

languages.forEach((lan) => console.log(lan));
```

```js
const languages = ["C", "Python", "JavaScript"];

for (let i = 0; i < languages.length; ++i) {
  console.log(languages[i]);
}
```

### Checking If Two Arrays Are Equal

```js
const array1 = ["A", "B"];
const array2 = ["A", "B"];

for (let i = 0; i < arrayA.length; ++i) {
  if (array1[i] !== array2[i]) return false;
}
```

### Array Destructuring

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const [C, Python, JavaScript, Ruby, Java] = languages;
console.log(Ruby); // Ruby
```

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const [C, , , Ruby, Java] = languages;
console.log(Ruby); // Ruby
```

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const [first, Python, ...rest] = languages;
console.log(rest); // ["JavaScript", "Ruby", "Java"]
```

### Spread Operator

```js
const languages = ["C", "Python", "JavaScript"];
const moreLanguages = ["Ruby", "Java"];
const allLanguages = [...languages, ...moreLanguages];
console.log(allLanguages); // ["C", "Python", "JavaScript", "Ruby", "Java"]
```

```js
const numbers = [1, 2, 3, 4, 5];
Math.max(...numbers); // 5
```

### Cloning an Array

```js
const languages = ["C", "Python", "JavaScript"];
const clone = languages.slice();
```

```js
const languages = ["C", "Python", "JavaScript"];
const clone = [...languages];
```

### Merging Two Arrays

```js
const languages = ["C", "Python", "JavaScript"];
const moreLanguages = ["Ruby", "Java"];
const allLanguages = languages.concat(moreLanguages); // ["C", "Python", "JavaScript", "Ruby", "Java"]
```

```js
const languages = ["C", "Python", "JavaScript"];
const moreLanguages = ["Ruby", "Java"];
const allLanguages = [...languages, ...moreLanguages]; // ["C", "Python", "JavaScript", "Ruby", "Java"]
```

### Copying a Portion of an Array by Position

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const sliced = languages.slice(1, 3); // ["Python", "JavaScript"]
```

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const sliced = languages.slice(-2); // ["Ruby", "Java"]
```

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const sliced = languages.slice(2); // ["JavaScript", "Ruby", "Java"]
```

### Remove duplicates

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java", "Python"];
const uniqueLanguages = [...new Set(languages)];

console.log(uniqueLanguages); // ["C", "Python", "JavaScript", "Ruby", "Java"]
```

### Find an item in an array

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];

languages.includes("Python"); // true
languages.indexOf("Python"); // 1
```

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];

const found = languages.find((language) => language === "Python");
console.log(found); // Python

const foundIndex = languages.findIndex((language) => language === "Python");
console.log(foundIndex); // 1
```

### Removing Array Elements

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const index = languages.indexOf("Ruby");
languages.splice(index, 1); // Start at index and remove 1 element
console.log(languages); // ["C", "Python", "JavaScript", "Java"]
```

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const index = languages.indexOf("Ruby");
languages.splice(index, 1, "Go"); // Start at index and remove 1 element, and add "Go"
console.log(languages); // ["C", "Python", "JavaScript", "Go", "Java"]
```

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const filtered = languages.filter((language) => language !== "Ruby");
console.log(filtered); // ["C", "Python", "JavaScript", "Java"]
```

### Sorting an Array of Objects by a Property Value

```js
const people = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Doe", age: 20 },
];

people.sort((a, b) => a.age - b.age);
console.log(people); // [{ name: "Doe", age: 20 }, { name: "John", age: 25 }, { name: "Jane", age: 30 }]
```

```js
const people = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Doe", age: 20 },
];

people.sort((a, b) => a.name.localeCompare(b.name));
console.log(people); // [{ name: "Doe", age: 20 }, { name: "Jane", age: 30 }, { name: "John", age: 25 }]
```

### Map

Create a new array with the results of calling a provided function on every element in the calling array

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### Filter

Creates a new array with all elements that pass a test implemented by the provided function.

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const filtered = languages.filter((language) => language.length > 4);
console.log(filtered); // ["Python", "JavaScript"]
```

### Reduce

Executes a reducer function on each element of the array, resulting in a single output value.

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, number) => total + number, 0);
console.log(sum); // 15
```

## Functions

### Arrow Function

```js
const add = (a, b) => a + b;
```

```js
const add = (a, b) => {
  return a + b;
};
```

### Providing a Default Parameter Value

```js
const greet = (name = "World") => {
  console.log(`Hello, ${name}!`);
};
```

### Function That Accepts Unlimited Arguments

```js
const sum = (...args) => {
  return args.reduce((total, number) => total + number, 0);
};
```

### Named Function Parameters

```js
const greet = ({ name, greeting }) => {
  console.log(`${greeting}, ${name}!`);
};
```

### Creating a generator function

A generator function is a special type of function that can be paused and resumed.

```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

## Objects

### Create a new object

```js
const person = {
  name: "John",
  age: 25,
  city: "New York",
};
```

### Add new property to an object

```js
const person = {
  name: "John",
  age: 25,
  city: "New York",
};

person.job = "Developer";
console.log(person); // { name: "John", age: 25, city: "New York", job: "Developer" }
```

### Remove a property from an object

```js
const person = {
  name: "John",
  age: 25,
  city: "New York",
  job: "Developer",
};

delete person.job;
console.log(person); // { name: "John", age: 25, city: "New York" }
```

### Check if a property exists

```js
const person = {
  name: "John",
  age: 25,
  city: "New York",
  job: "Developer",
};

if ("job" in person) {
  console.log("Job exists");
}
```

### Iterate over an object

```js
const person = {
  name: "John",
  age: 25,
  city: "New York",
  job: "Developer",
};

const properties = Object.keys(person);

for (const property of properties) {
  console.log(`${property}: ${person[property]}`);
}
```

### Check if an object is empty

```js
const person = {};

if (Object.keys(person).length === 0) {
  console.log("The object is empty");
}
```

### Merge two objects

```js
const person = {
  name: "John",
  age: 25,
};

const job = {
  job: "Developer",
};

const employee = { ...person, ...job };
console.log(employee); // { name: "John", age: 25, job: "Developer" }
```

### Clone an object

```js
const person = {
  name: "John",
  age: 25,
};

const clone = { ...person };
```

### Making a deep copy of an object

```js
const person = {
  name: "John",
  age: 25,
  address: {
    city: "New York",
    state: "NY",
  },
};

const clone = JSON.parse(JSON.stringify(person));
```

### Optional Chaining

Allows you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.

```js
const person = {
  name: "John",
  age: 25,
};

console.log(person.job.title); // Uncaught TypeError: Cannot read property 'title' of undefined
console.log(person.job?.title); // undefined
```

## Classes

### Create a class

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, ${this.name}, who is ${this.age}!`);
  }
}

const john = new Person("John", 25);
john.greet(); // Hello, John, who is 25!
```

### Method Chaining

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, ${this.name}, who is ${this.age}!`);
    return this;
  }

  setAge(age) {
    this.age = age;
    return this;
  }
}

const john = new Person("John", 25);
john.setAge(30).greet(); // Hello, John, who is 30!
```

### Inheritance

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, ${this.name}, who is ${this.age}!`);
  }
}

class Employee extends Person {
  constructor(name, age, job) {
    super(name, age);
    this.job = job;
  }

  title() {
    console.log(`${this.name},  works as a ${this.job}!`);
  }
}

const john = new Employee("John", 25, "Developer");
john.greet(); // Hello, John, who is 25!
john.title(); // John works as a Developer!
```

### Static Methods

Static methods are called on the class itself, not on an instance of the class.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static create(name, age) {
    return new Person(name, age);
  }
}

const john = Person.create("John", 25);
```

## Asynchronous Programming

### Return a promise

```js
const promise = fetch("https://jsonplaceholder.typicode.com/posts/1");

promise
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
  .finally(() => console.log("Done"));
```

### Async/Await

```js
const fetchData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await response.json();
  console.log(data);
};

fetchData();
```

### Multiple Promises

```js
const axios = require("axios");

const getDogPic = async () => {
  const husky_promise = axios.get(`https://dog.ceo/api/breed/husky/images/random`);
  const doberman_promise = axios.get(`https://dog.ceo/api/breed/doberman/images/random`);
  const hound_promise = axios.get(`https://dog.ceo/api/breed/hound/images/random`);

  const all = await Promise.all([husky_promise, doberman_promise, hound_promise]);

  const images = all.map((image) => {
    return image.body.message;
  });

  console.log(images);
};
```

## Regex

```js
const text = `One Ring to rule them all
One Ring to find them
One Ring to bring them all
and in the darkness bind them`;

const pattern = /.+bind them/;

const match = text.match(pattern);
console.log(match); // prints out the match object
console.log(match.toString()); // and in the darkness bind them

console.log(pattern.test(text)); // true
```

```js
const original = "Now is the time, this is the tame";
const match = original.match(/t\w{2}e/g);
console.log(match);
// [ 'time', 'tame' ]
```

### Finding all instances of a pattern

```js
const searchString = "Now is the time and this is the time and that is the time";
const regex = /t\w*e/g; // starts with an t and ends with an e
const matches = searchString.matchAll(regex);
for (const match of matches) {
  console.log(match[0]);
}
//the
// time
// the
// time
// the
// time
```

### Validate email address

```js
const emailValid = "abeLincoln@gmail.com";
const emailInvalid = "abeLincoln@gmail .com";
const regex = /\S+@\S+\.\S+/;

if (regex.test(emailValid)) {
  console.log("This email is valid");
}
```

## Errors

### Try/Catch

```js
try {
  fetch("invalid-url");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(error.stack);
}
```

### Run another function after try/catch

```js
try {
  fetch("invalid-url");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
} finally {
  console.log("Done");
}
```

### Catching Errors in Async Functions

```js
const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
};

fetchData();
```

### Catching different types of errors

```js
try {
  // ...
} catch (error) {
  if (error instanceof TypeError) {
    console.log("This is a TypeError");
  } else if (error instanceof RangeError) {
    console.log("This is an RangeError");
  } else {
    throw error;
  }
}
```

### Throwing an error

```js
const divide = (a, b) => {
  if (b === 0) {
    //highlight-next-line
    throw new Error("Cannot divide by zero");
  }

  return a / b;
};
```

### Throwing a custom error

```js
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

const divide = (a, b) => {
  if (b === 0) {
    throw new CustomError("Cannot divide by zero");
  }

  return a / b;
};

// Output: CustomError: Cannot divide by zero
```

## Testing

### Writing Unit Tests with Jest

```bash
npm install --save-dev jest
```

Add the following section to your package.json:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

```mdx-code-block
<Tabs>
<TabItem value="Function">
```

```js title='index.js'
"use strict";

module.exports.add = (a, b) => {
  return a + b;
};
```

```mdx-code-block
</TabItem>
<TabItem value="Test">
```

```js title='index.test.js'
const { add } = require("./index");

describe("Addition Unit Test", () => {
  test("add two numbers", () => {
    expect(add(1, 2)).toBe(3);
  });
  test("add two more numbers", () => {
    expect(add(3, 2)).toBe(5);
  });
});
```

```mdx-code-block
</TabItem>
</Tabs>
```

Finally, and Jest will print the message:

```bash
npm test
```

### Jest Matchers

| Function           | Description                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| arrayContaining()  | Searches an array for a given value.                                         |
| not()              | Allows you to reverse any condition.                                         |
| stringContaining() | Searches a string for a substring.                                           |
| stringMatching()   | Attempts to match a string to a regular expression.                          |
| toBe()             | Tests for standard JavaScript equality, just as if you used the == operator. |
| toBeCloseTo()      | Tests that two numbers are equal or very close.                              |
| toBeGreaterThan()  | Checks if a numeric value is greater than the value you specify.             |
| toBeInstanceOf()   | Checks if a returned object is an instance of a specified class.             |
| toBeNull()         | Checks if a value is null.                                                   |
| toBeTruthy()       | Tests if a number is truthy.                                                 |
| toEqual()          | Performs a deep comparison that checks if one object has the same content.   |
| toHaveProperty()   | Checks if a returned object has a specific property.                         |
| toStrictEqual()    | Similar to toEqual() but requires the objects to match exactly.              |
| toThrow            | Tests if the function throws an exception.                                   |

### Tracking Test Coverage

```bash
npm install --save-dev jest jest-cli jest-coverage-badges
```

Add the following section to your package.json:

```json
{
  "scripts": {
    "test": "jest",
    "test-coverage": "jest --collect-coverage"
  }
}
```

```bash
npm run test-coverage
```

## Other

### How to document a function

```js
/**
 * Calculate the sum of two numbers.
 *
 * This function takes two numbers as parameters and returns their sum.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 * @throws {Error} Will throw an error if either parameter is not a number.
 *
 * @example
 * const result = addNumbers(3, 5);
 * console.log(result); // Output: 8
 */
function addNumbers(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both parameters must be numbers");
  }

  return a + b;
}
```

### Load env variables from a file (dotenv)

```bash
npm i dotenv
```

```mdx-code-block
<Tabs>
<TabItem value="app.js">
```

```javascript
require("dotenv").config({ path: "./.env" });
console.log(process.env["S3_BUCKET"]);
```

```mdx-code-block
</TabItem>
<TabItem value=".env">
```

```env
S3_BUCKET="YOURS3BUCKET"
```

```mdx-code-block
</TabItem>
</Tabs>
```

### How to make an HTTP request (axios)

```bash
npm i axios
```

```js
"use strict";

const axios = require("axios");
```

```mdx-code-block
<Tabs>
<TabItem value="GET">
```

```js
const getData = async () => {
  try {
    const response = await axios.get(endpoint);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
```

```mdx-code-block
</TabItem>
<TabItem value="POST">
```

```js
const postData = async () => {
  try {
    await axios.post(
      endpoint,
      { hello: "World" },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
```

```mdx-code-block
</TabItem>
<TabItem value="PUT">
```

```js
const putData = async () => {
  try {
    await axios.put(endpoint, { hello: "JavaScript" });
  } catch (err) {
    console.log(err);
  }
};
```

```mdx-code-block
</TabItem>
<TabItem value="DELETE">
```

```js
const deleteData = async () => {
  try {
    await axios.delete(endpoint, { hello: "JavaScript" });
  } catch (err) {
    console.log(err);
  }
};
```

```mdx-code-block
</TabItem>
</Tabs>
```

### How to hash a password (bcrypt)

```bash
npm i bcrypt
```

```javascript
const bcrypt = require("bcrypt");

const storePassword = async (myPassword, saltRounds) => {
  const hashedPW = await bcrypt.hash(myPassword, saltRounds);
  return hashedPW;
};

const checkPassword = async (plain, hash) => {
  const result = await bcrypt.compare(plain, hash);
  return result;
};

const test = async () => {
  const saltRounds = 12;
  const myPassword = "Stoffel";

  const hashedPW = await storePassword(myPassword, saltRounds);
  console.log(hashedPW); // $2b$12$eyi.sLJKvsx/KvIbabndYuqUpvzAXgPXRROoIKgfh1QR2dl/McA7u

  const result = await checkPassword(myPassword, hashedPW);
  console.log(result); // true

  const wrong = await checkPassword("SomeRandomString", hashedPW);
  console.log(wrong); // false
};

test();
```

### How to generate a UUID

```bash
npm i uud
```

```javascript
"use strict";
const { v4: uuidv4 } = require("uuid"); // npm install uuid
console.log(uuidv4()); // b8dff6a8-e942-417f-ade7-b62479d47c85
```

### How to lint your code (ESLint)

```bash
npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev
```

Create a .eslintrc.json file

Sample

```json
{
  "extends": ["airbnb", "prettier", "plugin:node/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "spaced-comment": "off",
    "no-console": "warn",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-process-exit": "off",
    "no-param-reassign": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }]
  }
}
```
