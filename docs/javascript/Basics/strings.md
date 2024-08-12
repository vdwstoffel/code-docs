---
sidebar_label: Strings
sidebar_position: 1
---

# Strings

## Validate a non empty string

```js
const str = "Hello World";
if (typeof str === "string" && str.trim().length > 0) {
  console.log(str + " is a valid string");
}
```

## Convert number to string

```js
const someNumber = 12.984754;

console.log(someNumber.toFixed(3)); // "12.985"
console.log(someNumber + ""); // "12.984754"
```

## String Literals

```js
const literal = "Hello World";

console.log(`This is your string: ${literal}`); // This is your string: Hello World
```

## Check that string match

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

## Check if substring exists

```js
const containsSubstring = (fullString, subString) => {
  if (fullString.includes(subString)) {
    console.log("Substring was found");
  }
};
```

## Replace

```js
const replaceAllString = (fullString, originalWord, replaceWord) => {
  console.log(fullString.replaceAll(originalWord, replaceWord));
};
```

## Turn String into an array

```js
const languages = "C, C++, Python, Javascript";
languages.split(","); //[ 'C', ' C++', ' Python', ' Javascript' ]
```

## Converting the First Letter of a String to Uppercase

```js
const original = "if you cut an orange, there is a risk it will orbisculate.";
const fixed = original[0].toUpperCase() + original.slice(1);
// fixed = 'If you cut an orange, there is a risk it will orbisculate.';
```

## Convert Array to String

```js
const languages = ["C", "Python", "JavaScript"];
const string = languages.join(", ");

console.log(string); // "C, Python, JavaScript"
```
