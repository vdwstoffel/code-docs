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
const name: string = "stoffel";
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
userInput = "stoffel";
```