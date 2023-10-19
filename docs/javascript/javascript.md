---
sidebar_label: "JavaScript"
sidebar_position: 1
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Javascript

import JSLogo from "@site/static/img/JavaScript.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

<DisplayLogo logo={JSLogo} />

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
