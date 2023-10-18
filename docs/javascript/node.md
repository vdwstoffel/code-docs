---
sidebar_label: "Node"
sidebar_position: 1
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Node

## Getting Started

### Init

```bash
npm init
```

### Install

To install from `package.json`

```bash
npm install
```

### Remove package

```bash
npm remove <package-name>
```

## I/O

```javascript
const fs = require("fs");
```

```mdx-code-block
<Tabs>
<TabItem value="Read">
```

`__dirname` refers to the location the script is located

```js
fs.readFile(`${__dirname}/asyncExample.txt`, "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

```mdx-code-block
</TabItem>
<TabItem value="Write">
```

`__dirname` refers to the location the script is located

```js
const text = "This is async code\n";
fs.writeFile(`${__dirname}/textOut.txt`, text, "utf-8", (err) => {
  if (err) throw err;
  console.log("File ok");
});
```

```mdx-code-block
</TabItem>
<TabItem value="Append">
```

`__dirname` refers to the location the script is located

```js
const textToAppend = "This line has been appended to the file\n";
fs.appendFile(`${__dirname}/textOut.txt`, textToAppend, (err) => {
  if (err) throw err;
  console.log("File appended check output");
});
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Nodemon

```bash
npm install nodemon --save-dev
```

```json title="package.json"
"scripts": {
  "start": "nodemon index.js"
}
"devDependencies": {
  "nodemon": "^1.18.11"
}
```

Then in the terminal run

```bash
npm run start
```
