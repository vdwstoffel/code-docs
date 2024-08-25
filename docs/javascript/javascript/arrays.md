---
sidebar_label: Arrays
sidebar_position: 4
---


# Arrays

## Add an item to an array

```js
const languages = ["C", "Python", "JavaScript"];
languages.push("Ruby");
```

## Checking If an Object Is an Array

```js
const languages = ["C", "Python", "JavaScript"];
if (Array.isArray(languages)) {
  // languages is an array
}
```

## Checking length of an array

```js
const languages = ["C", "Python", "JavaScript"];
languages.length; // 3
```

## Iterating Over an Array

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

## Checking If Two Arrays Are Equal

```js
const array1 = ["A", "B"];
const array2 = ["A", "B"];

for (let i = 0; i < arrayA.length; ++i) {
  if (array1[i] !== array2[i]) return false;
}
```

## Array Destructuring

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

## Spread Operator

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

## Cloning an Array

```js
const languages = ["C", "Python", "JavaScript"];
const clone = languages.slice();
```

```js
const languages = ["C", "Python", "JavaScript"];
const clone = [...languages];
```

## Merging Two Arrays

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

## Copying a Portion of an Array by Position

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

## Remove duplicates

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java", "Python"];
const uniqueLanguages = [...new Set(languages)];

console.log(uniqueLanguages); // ["C", "Python", "JavaScript", "Ruby", "Java"]
```

## Find an item in an array

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

## Removing Array Elements

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

## Sorting an Array of Objects by a Property Value

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

## Map

Create a new array with the results of calling a provided function on every element in the calling array

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

## Filter

Creates a new array with all elements that pass a test implemented by the provided function.

```js
const languages = ["C", "Python", "JavaScript", "Ruby", "Java"];
const filtered = languages.filter((language) => language.length > 4);
console.log(filtered); // ["Python", "JavaScript"]
```

## Reduce

Executes a reducer function on each element of the array, resulting in a single output value.

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, number) => total + number, 0);
console.log(sum); // 15
```
