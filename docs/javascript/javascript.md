---
sidebar_label: "JavaScript"
sidebar_position: 1
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

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
