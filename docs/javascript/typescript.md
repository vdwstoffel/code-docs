---
sidebar_label: "TypeScript"
sidebar_position: 201
---

import TSLogo from "@site/static/img/ts.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

# TypeScript

<DisplayLogo logo={TSLogo}/>

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

### Creating an array of custom object types

```typescript
type Person = {
  name: string;
  age: number;
};

const people: Person[] = [
  { name: "John", age: 31 },
  { name: "Jane", age: 28 },
];
```

### Combine multiple types

`Intersection types` allow you to combine multiple types.

```typescript
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const employee: ElevatedEmployee = {
  name: "John",
  privileges: ["create-server"],
  startDate: new Date(),
};
```

## Objects

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

### Creating a custom object type

```typescript
type Person = {
  name: string;
  age: number;
};

const john: Person = {
  name: "John",
  age: 31,
};
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

## Functions

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

### Define multiple function signatures

`Function overloads` allow you to define multiple function signatures.

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}

const result = add(1, 2); //  function add(a: number, b: number): number (+1 overload)
const result2 = add("Hello", "World"); // function add(a: string, b: string): string (+1 overload)
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

### Creating classes with Generics

```typescript
class MyStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const text = new MyStorage<string>();
text.addItem("Hello");

const numberStorage = new MyStorage<number>();
numberStorage.addItem(1);
```

## Type Guards

Type guards are used to check the type of a variable.

### Discriminated Unions

Discriminated unions are used to create a type guard. The `type` property is used to determine the type of the object.

```typescript
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log(`Moving at speed: ${speed}`);
}
```

## Type Casting

Type casting is used to tell TypeScript that a variable is of a specific type.

### Type Casting with as (JSX)

`!` tells TypeScript that the element is not null.

```typescript
const inputElement = document.getElementById("input")! as HTMLInputElement;
```

### Type Casting with <\>

```typescript
const inputElement = <HTMLInputElement>document.getElementById("input");
```

## Generics

Generics allow you to create reusable code.

### Simple Generic Function

```typescript
// T is a placeholder for the type
function identity<T>(name: T): T {
  return name;
}

const output = identity<string>("Dave");
console.log(output); // Dave
```

### Adding Type Constraints

```typescript
const constraint = <T extends number, U extends number>(a: T, b: U): number => {
  return a + b;
};

const result = constraint(1, 2); // 3
```

### Keyof

`keyof` is used to get the keys of an object.

```typescript
interface Person {
  name: string;
  age: number;
}

function printPersonProperty<T extends object, U extends keyof T>(person: T, property: U): void {
  console.log(`Printing person property ${property}: "${person[property]}"`);
}
let person = {
  name: "Max",
  age: 27,
};
printPersonProperty(person, "name"); // Printing person property name: "Max"
```

## Decorators

Decorators are used to add metadata to a class.

### Enabling Decorators in tsconfig.json

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### Creating a decorator

```typescript
function Print(print: string) {
  return function (constructor: Function) {
    console.log("Logging...");
    console.log(print); // Logging Class Cat
    console.log(constructor); // [class Cat]
  };
}

@Print("Logging Class Cat")
class Cat {
  name = "Garfield";

  constructor() {
    console.log("This is a cat");
  }
}

const garfield = new Cat();
console.log(garfield);
```

## React with TypeScript

### Creating a functional component

```tsx title="App.tsx"
import TodoList from "./components/TodoList";

type TodoType = {
  id: number;
  task: string;
};

export default function App() {
  const todo: TodoType[] = [
    { id: 1, task: "Cleaning" },
    { id: 2, task: "Cooking" },
  ];
  return (
    <>
      <h1>Hello TS</h1>
      <TodoList todo={todo} name={"App"} />
    </>
  );
}
```

```tsx title="TodoList.tsx"
type TodoListProps = {
  todo: { id: number; task: string }[];
  name: string;
};

type Todo = {
  id: number;
  task: string;
};

export default function TodoList({ todo, name }: TodoListProps) {
  return (
    <>
      <h1>{name}</h1>
      <ul>
        {todo.map((el: Todo) => (
          <li key={el.id}>{el.task}</li>
        ))}
      </ul>
    </>
  );
}
```

### Creating a types file

```ts title="Todo.types.ts"
export type Todo = {
  id: number;
  task: string;
};
```

```tsx title="App.tsx"
import TodoList from "./components/TodoList";

import { Todo } from "./Todo.types";

export default function App() {
  const todo: Todo[] = [
    { id: 1, task: "Cleaning" },
    { id: 2, task: "Cooking" },
  ];
  return (
    <>
      <TodoList todo={todo} />
    </>
  );
}
```
### Modules that does not support TypeScript

```bash
npm install @types/react-router-dom
```

## Express With TypeScript

```bash
npm i express 
npm i --save-dev @types/express
```

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "moduleResolution": "node10",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### Basic express app

```ts title="app.ts"
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```
