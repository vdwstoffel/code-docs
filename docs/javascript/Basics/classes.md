---
sidebar_label: 'Classes'
sidebar_position: 7
---

# Classes

## Create a class

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, ${this.name}, who is ${this.age}!`);
  }
}

const john = new Person("John", 25);
john.greet(); // Hello, John, who is 25!
```

## Method Chaining

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, ${this.name}, who is ${this.age}!`);
    return this;
  }

  setAge(age) {
    this.age = age;
    return this;
  }
}

const john = new Person("John", 25);
john.setAge(30).greet(); // Hello, John, who is 30!
```

## Inheritance

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, ${this.name}, who is ${this.age}!`);
  }
}

class Employee extends Person {
  constructor(name, age, job) {
    super(name, age);
    this.job = job;
  }

  title() {
    console.log(`${this.name},  works as a ${this.job}!`);
  }
}

const john = new Employee("John", 25, "Developer");
john.greet(); // Hello, John, who is 25!
john.title(); // John works as a Developer!
```

## Static Methods

Static methods are called on the class itself, not on an instance of the class.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static create(name, age) {
    return new Person(name, age);
  }
}

const john = Person.create("John", 25);
```
