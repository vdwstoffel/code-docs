---
sidebar_label: "Testing"
sidebar_position: 7
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Testing

## Jest

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

test("add two numbers", () => {
  expect(add(1, 2)).toBe(3);
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
