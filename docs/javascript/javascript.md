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

## Async/Await

```js
const axios = require("axios");

const url = "https://swapi.dev/api/";

const getPeople = async () => {
  const data = await axios.get(`${url}people/1`);
  console.log(data.data.name);
};

getPeople();
```

### Multiple Promises

To run multiple promises simultaneously

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

getDogPic();
```

## OOP

```mdx-code-block
<Tabs>
<TabItem value="animal.js">
```

```javascript
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }

  makeSound() {
    console.log(`${this.name} makes a sound.`);
  }
}

module.exports = Animal;
```

```mdx-code-block
</TabItem>
<TabItem value="main.js">
```

```javascript
const Animal = require("./animal");

const cat = new Animal("Whiskers", "Cat");
cat.makeSound(); // Output: Whiskers makes a sound.
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Inheritance

```mdx-code-block
<Tabs>
<TabItem value="Base Class">
```

Base class (parent class)

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

module.exports = Animal;
```

```mdx-code-block
</TabItem>
<TabItem value="Child class">
```

Derived class (child class) inheriting from Animal

```js
const Animal = require("./animal");

class Dog extends Animal {
  constructor(name, breed) {
    super(); // Call the constructor of the parent class
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} the ${this.breed} barks.`);
  }
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

```js
// Create instances of the classes
const genericAnimal = new Animal("Generic Animal");
const myDog = new Dog("Buddy", "Golden Retriever");

// Call methods on the instances
genericAnimal.speak(); // Output: Generic Animal makes a sound.
myDog.speak(); // Output: Buddy the Golden Retriever barks.
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

## Docstring

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
