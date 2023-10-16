---
sidebar_label: "JavaScript Intro"
sidebar_position: 1
---

# Javascript

Basic concepts of JavaScript

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
