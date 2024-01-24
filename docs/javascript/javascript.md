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

## Arrays

```js
const names = ["alpha", "bravo", "charlie"];
```

### View/Add/Remove

```mdx-code-block
<Tabs>
<TabItem value="Length">
```

```js
names.length; // 3
```

```mdx-code-block
</TabItem>
<TabItem value="Index">
```

```js
names[2]; // charlie
```

```mdx-code-block
</TabItem>
<TabItem value="Push">
```

```js
names.push("delta"); // [ 'alpha', 'bravo', 'charlie', 'delta' ]
```

```mdx-code-block
</TabItem>
<TabItem value="Splice">
```

```js
const index = names.indexOf("bravo");
names.splice(index, 1);
console.log(names); // [ 'alpha', 'charlie' ]
```

```mdx-code-block
</TabItem>
<TabItem value="Includes">
```

```js
names.includes("charlie"); // true
```

```mdx-code-block
</TabItem>
<TabItem value="join">
```

```js
names.join(" "); // alpha charlie charlie
names.join("-"); // alpha-bravo-charlie
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Iteration

```mdx-code-block
<Tabs>
<TabItem value="Loop">
```

```js
for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}
```

```mdx-code-block
</TabItem>
<TabItem value="forEach">
```

```js
names.forEach((name) => {
  console.log(name);
});
```

```mdx-code-block
</TabItem>
<TabItem value="Map">
```

```js
const uppercaseNames = names.map((name) => {
  return name.toUpperCase();
});

console.log(uppercaseNames); // [ 'ALPHA', 'BRAVO', 'CHARLIE' ]
```

```mdx-code-block
</TabItem>
<TabItem value="Filter">
```

```js
const result = names.filter((name) => {
  return name.length < 6;
});

console.log(result); // [ 'alpha', 'bravo' ]
```

```mdx-code-block
</TabItem>
<TabItem value="Reduce">
```

```js
const numbers = [1, 2, 3, 4, 5];

// Use the reduce method to find the sum of all elements in the array
const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum); // Output: 15
```

```mdx-code-block
</TabItem>
</Tabs>
```

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
