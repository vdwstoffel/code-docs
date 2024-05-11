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

## Type definitions

TypeScript uses type definitions to describe the shape of an object.

```typescript
const name: string = "stoffel";
const age: number = 31;
const isDeveloper: boolean = true;
const hobbies: string[] = ["sports", "cooking"]; // array of strings
```

### Adding a tuple to TypeScript

```typescript
const myTuple: [string, number] = ["stoffel", 31];
```

### Defining a tuple in a object

```typescript
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // set a tuple type
} = {
  name: "Stoffel",
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
  name: "Stoffel",
  role: Role.ADMIN,
};
```

### Giving an argument multiple types with unions

```typescript   
let userInput: string | number;

userInput = 5;
userInput = "stoffel";
```

### Literal types

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
userInput = "stoffel";
```