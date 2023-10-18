---
sidebar_label: "Node"
sidebar_position: 1
---


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

`__dirname` refers to the location the script is located

```javascript
const fs = require("fs");

fs.readFile(`${__dirname}/asyncExample.txt`, "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// File will always be overwritten
const text = "This is async code\n";
fs.writeFile("textOut.txt", text, "utf-8", (err) => {
  if (err) throw err;
  console.log("File ok");
});

// Append to the file
const textToAppend = "This line has been appended to the file\n";
fs.appendFile(`${__dirname}/textOut.txt`, textToAppend, (err) => {
  if (err) throw err;
  console.log("File appended check output");
});
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
