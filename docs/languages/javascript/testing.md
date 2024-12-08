# Testing

## Writing Unit Tests with Jest

```bash
npm install --save-dev jest
```

Add the following section to your package.json:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

```mdx-code-block
<Tabs>
<TabItem value="Function">
```

```js title='index.js'
"use strict";

module.exports.add = (a, b) => {
  return a + b;
};
```

```mdx-code-block
</TabItem>
<TabItem value="Test">
```

```js title='index.test.js'
const { add } = require("./index");

describe("Addition Unit Test", () => {
  test("add two numbers", () => {
    expect(add(1, 2)).toBe(3);
  });
  test("add two more numbers", () => {
    expect(add(3, 2)).toBe(5);
  });
});
```

```mdx-code-block
</TabItem>
</Tabs>
```

Finally, and Jest will print the message:

```bash
npm test
```

## Jest Matchers

| Function           | Description                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| arrayContaining()  | Searches an array for a given value.                                         |
| not()              | Allows you to reverse any condition.                                         |
| stringContaining() | Searches a string for a substring.                                           |
| stringMatching()   | Attempts to match a string to a regular expression.                          |
| toBe()             | Tests for standard JavaScript equality, just as if you used the == operator. |
| toBeCloseTo()      | Tests that two numbers are equal or very close.                              |
| toBeGreaterThan()  | Checks if a numeric value is greater than the value you specify.             |
| toBeInstanceOf()   | Checks if a returned object is an instance of a specified class.             |
| toBeNull()         | Checks if a value is null.                                                   |
| toBeTruthy()       | Tests if a number is truthy.                                                 |
| toEqual()          | Performs a deep comparison that checks if one object has the same content.   |
| toHaveProperty()   | Checks if a returned object has a specific property.                         |
| toStrictEqual()    | Similar to toEqual() but requires the objects to match exactly.              |
| toThrow            | Tests if the function throws an exception.                                   |

## Tracking Test Coverage

```bash
npm install --save-dev jest jest-cli jest-coverage-badges
```

Add the following section to your package.json:

```json
{
  "scripts": {
    "test": "jest",
    "test-coverage": "jest --collect-coverage"
  }
}
```

```bash
npm run test-coverage
```
