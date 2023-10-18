---
sidebar_label: "JavaScript"
sidebar_position: 1
---

# Javascript

Basic concepts of JavaScript

## Arrays

### Map

```js
const names = ["alice", "bob", "charlie", "dave"];

// Singleline
const uppercaseNames = names.map((name) => name.toUpperCase());

// Multiline
const uppercaseNames = names.map((name) => {
  return name.toUpperCase();
});

console.log(uppercaseNames); // Output: ['ALICE', 'BOB', 'CHARLIE', 'DAVE']
```

## OOP

```javascript title="animal.js"
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

```javascript title="main.js"
const Animal = require("./animal");

const cat = new Animal("Whiskers", "Cat");
cat.makeSound(); // Output: Whiskers makes a sound.
```

## Importing/Exporting

### Common JS

```js title="myModule.js"
module.exports = () => {
  // ...
};
```

```js
const myModule = require("./myModule");
```
