---
sidebar_label: "Node"
sidebar_position: 1
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Node

import DisplayLogo from "@site/src/components/DisplayLogo"
import nodeLogo from "@site/static/img/nodejs.png"

<DisplayLogo logo={nodeLogo}/>

## Getting Started

### Init

```bash
npm init
```

### Install

To install all from `package.json`

```bash
npm install
```

### Install a package

```bash
npm i <package-name>
```

### Install package as dev-dependency

```bash
npm i <package-name> --save-dev
```

### Remove package

```bash
npm remove <package-name>
```

### Updating a package

```bash
npm update <package-name>
```

To update all packges

```bash
npm update
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

## Shell Commands

```javascript
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function runShellCommand() {
  try {
    const { stdout, stderr } = await exec("ls -al");
    console.log("Standard Output:", stdout);
    console.error("Standard Error:", stderr);
  } catch (error) {
    console.error("Error:", error);
  }
}

runShellCommand();
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

## Modules Export

### Common JS

```mdx-code-block
<Tabs>
<TabItem value="Single Function">
```

```js title="single_func.js"
const hello = () => {
  console.log("Hello");
};

module.exports = hello;
```

```js title="app.js"
const hello = require("./single_func");

hello();
```

```mdx-code-block
</TabItem>
<TabItem value="Multiple Functions">
```

**Method 1**

```js title="multiple.js"
module.exports.funcOne = () => {
  console.log("Func One");
};

module.exports.funcTwo = () => {
  console.log("FuncTwo");
};
```

**Method 2**

```js
const funcOne = () => {
  console.log("Func One");
};

const funcTwo = () => {
  console.log("Func Two");
};

module.exports = { funcOne, funcTwo };
```

```javascript
const multiple = require("./multiple_func");

multiple.funcOne();
multiple.funcTwo();
```

```mdx-code-block
</TabItem>
</Tabs>
```

### ES6

```mdx-code-block
<Tabs>
<TabItem value="Single Function">
```

```js title="single_func.js"
export const hello = () => {
  console.log("Hello");
};
```

```js title="app.js"
import { hello } from "./single_func";

hello();
```

```mdx-code-block
</TabItem>
<TabItem value="Multiple Functions">
```

```js title="multiple_func.js"
export const funcOne = () => {
  console.log("Func One");
};

export const funcTwo = () => {
  console.log("Func Two");
};
```

```js title="app.js"
import { funcOne, funcTwo } from "./multiple_func";

funcOne();
funcTwo();
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Email

```bash
npm i nodemailer
npm i dotenv
```

```js
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../../config.env" });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (options) => {
  const info = await transporter.sendMail({
    from: `Test <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    subject: "Hello Mail",
    text: "Some text",
    html: "<h1>Some HTML<h1>",
  });
  console.log(info.messageId);
};

sendMail();
```

## ESLint

```bash
npm install eslint --save-dev
npx eslint --init
```
## Create a json-server
  
```bash
npm install json-server
```

Create a `db.json` file

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

Add to `package.json`

```json
"scripts": {
  "json:server": "json-server --watch db.json --port 5000"
}
```

Run

```bash
npm run json:server
```

```bash
curl http://localhost:5000/posts
$ {"posts":[{"id":1,"title":"json-server","author":"typicode"}]}
```