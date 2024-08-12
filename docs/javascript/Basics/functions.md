---
sidebar_label: Functions
sidebar_position: 6
---

# Functions

## Arrow Function

```js
const add = (a, b) => a + b;
```

```js
const add = (a, b) => {
  return a + b;
};
```

## Providing a Default Parameter Value

```js
const greet = (name = "World") => {
  console.log(`Hello, ${name}!`);
};
```

## Function That Accepts Unlimited Arguments

```js
const sum = (...args) => {
  return args.reduce((total, number) => total + number, 0);
};
```

## Named Function Parameters

```js
const greet = ({ name, greeting }) => {
  console.log(`${greeting}, ${name}!`);
};
```

## Creating a generator function

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

## How to document a function

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

