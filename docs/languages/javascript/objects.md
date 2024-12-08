---
sidebar_label: Objects
sidebar_position: 5
---

# Objects

## Create a new object

```js
const person = {
  name: "John",
  age: 25,
  city: "New York",
};
```

## Add new property to an object

```js
const person = {
  name: "John",
  age: 25,
  city: "New York",
};

person.job = "Developer";
console.log(person); // { name: "John", age: 25, city: "New York", job: "Developer" }
```

## Remove a property from an object

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

## Check if a property exists

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

## Iterate over an object

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

## Check if an object is empty

```js
const person = {};

if (Object.keys(person).length === 0) {
  console.log("The object is empty");
}
```

## Merge two objects

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

## Clone an object

```js
const person = {
  name: "John",
  age: 25,
};

const clone = { ...person };
```

## Making a deep copy of an object

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

## Optional Chaining

Allows you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.

```js
const person = {
  name: "John",
  age: 25,
};

console.log(person.job.title); // Uncaught TypeError: Cannot read property 'title' of undefined
console.log(person.job?.title); // undefined
```
