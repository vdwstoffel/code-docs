---
sidebar_label: "TypeScript"
sidebar_position: 201
---

# Typescript

## Installing typescript

```bash
npm install -g typescript
```

## Compiling TypeScript

Outputs a JavaScript file with the same name as the TypeScript file.

```bash
tsc filename.ts
```

### Initialize a TypeScript project

```bash
tsc --init
```

This creates a `tsconfig.json` file. You can now compile all TypeScript files in the project by running `tsc`.

```bash
tsc
```

### Enable watch mode

Automatically recompiles the TypeScript file when it changes.

```bash
tsc filename.ts --watch
```

### Exclude a file from compilation

```bash
tsc --init
```

This creates a `tsconfig.json` file. Add the file to the `exclude` array.

```json
{
  "exclude": ["filename.ts", "node_modules"]
}
```

## Type definitions

TypeScript uses type definitions to describe the shape of an object.

### Simple Types

```typescript
const name: string = "John";
const age: number = 31;
const isDeveloper: boolean = true;
const hobbies: string[] = ["sports", "cooking"]; // array of strings
```

### Creating a readonly array

```typescript
const hobbies: readonly string[] = ["sports", "cooking"];

hobbies.push("reading");
// Error: Property 'push' does not exist on type 'readonly string[]'
```

### Adding a tuple to TypeScript

```typescript
const myTuple: [string, number] = ["John", 31];
```

### Defining a tuple in a object

```typescript
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // set a tuple type
} = {
  name: "John",
  age: 31,
  hobbies: ["Sports", "cooking"],
  role: [2, "author"],
};
```

### Creating an Enum

Enums allow you to define a set of named constants.

```typescript
enum Role {
  ADMIN,
  AUTHOR,
  READ_ONLY,
}

const person = {
  name: "John",
  role: Role.ADMIN,
};
```

### Giving an argument multiple types with unions

```typescript
let userInput: string | number;

userInput = 5;
userInput = "John";
```

### Literal types - specifying exact values

```typescript
let userInput: "yes" | "no";

userInput = "yes";

userInput = "maybe";
// Error: Type '"maybe"' is not assignable to type '"yes" | "no"'
```

### Aliasing custom types

```typescript
type Combinable = string | number;

let userInput: Combinable;

userInput = 5;
userInput = "John";
```

## Classes

### Creating a class

```typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(this: Person) {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const John = new Person("John", 31);
John.greet(); // Hello, my name is John
```

### Protecting properties with access modifiers

```typescript
class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(this: Person) {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const John = new Person("John", 31);
John.age = 18; // Error: Property 'age' is private and only accessible within class 'Person'
```

### Make an object readonly

```typescript
class Person {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(this: Person) {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const John = new Person("John");
John.name = "Jack"; // Error: Cannot assign to 'name' because it is a read-only property
```

## Interfaces

Interfaces are used to define the structure of an object.

### Creating an interface

```typescript
interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
}

const john: Person = {
  name: "John",
  age: 28,
  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  },
};

console.log(john.name); // John
console.log(john.age); // 28
john.greet("Aita"); // Aita John
```

### Adding optional properties

```typescript
interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
  //highlight-next-line
  role?: string; // optional property
}
```

### Creating classes with interfaces

```typescript
interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
}

class Person implements Person {
  constructor(public name: string, public age: number) {}

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }

  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}
```

### Function Interfaces

```typescript
interface AddFn {
  (a: number, b: number): void;
}

const add: AddFn = (a: number, b: number) => {
  console.log(a + b);
};

add(1, 3);
```
