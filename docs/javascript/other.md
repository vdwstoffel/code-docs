---
sidebar_label: "Other"
sidebar_position: 6
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Other

## Axios

```bash
npm i axios
```

```js
"use strict";

const axios = require("axios"); // npm i axios
require("dotenv").config({ path: "../../.env" }); // npm i dotenv
const endpoint = process.env["FIREBASE"];
```

```mdx-code-block
<Tabs>
<TabItem value="GET">
```

```js
const getData = async () => {
  try {
    const response = await axios.get(endpoint);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
```

```mdx-code-block
</TabItem>
<TabItem value="POST">
```

```js
const postData = async () => {
  try {
    await axios.post(endpoint, { hello: "World" });
  } catch (err) {
    console.log(err);
  }
};
```

```mdx-code-block
</TabItem>
<TabItem value="PUT">
```

```js
const putData = async () => {
  try {
    await axios.put(endpoint, { hello: "JavaScript" });
  } catch (err) {
    console.log(err);
  }
};
```

```mdx-code-block
</TabItem>
<TabItem value="DELETE">
```

```js
const deleteData = async () => {
  try {
    await axios.delete(endpoint, { hello: "JavaScript" });
  } catch (err) {
    console.log(err);
  }
};
```

```mdx-code-block
</TabItem>
</Tabs>
```

## dotenv

```bash
npm i dotenv
```

```mdx-code-block
<Tabs>
<TabItem value="app.js">
```

```javascript
require("dotenv").config({ path: "./.env" });
console.log(process.env["S3_BUCKET"]);
```

```mdx-code-block
</TabItem>
<TabItem value=".env">
```

```env
S3_BUCKET="YOURS3BUCKET"
```

```mdx-code-block
</TabItem>
</Tabs>
```

## bcrypt

A library to help you hash passwords.

```bash
npm i bcrypt
```

```javascript
const bcrypt = require("bcrypt");

const storePassword = async (myPassword, saltRounds) => {
  const hashedPW = await bcrypt.hash(myPassword, saltRounds);
  return hashedPW;
};

const checkPassword = async (plain, hash) => {
  const result = await bcrypt.compare(plain, hash);
  return result;
};

const test = async () => {
  const saltRounds = 12;
  const myPassword = "Stoffel";

  const hashedPW = await storePassword(myPassword, saltRounds);
  console.log(hashedPW); // $2b$12$eyi.sLJKvsx/KvIbabndYuqUpvzAXgPXRROoIKgfh1QR2dl/McA7u

  const result = await checkPassword(myPassword, hashedPW);
  console.log(result); // true

  const wrong = await checkPassword("SomeRandomString", hashedPW);
  console.log(wrong); // false
};

test();
```

## UUID

```bash
npm i uud
```

```javascript
"use strict";
const { v4: uuidv4 } = require("uuid"); // npm install uuid
console.log(uuidv4()); // b8dff6a8-e942-417f-ade7-b62479d47c85
```

## EsLint

```bash
npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev
```

Create a .eslintrc.json file

Sample

```json
{
  "extends": ["airbnb", "prettier", "plugin:node/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "spaced-comment": "off",
    "no-console": "warn",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-process-exit": "off",
    "no-param-reassign": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }]
  }
}
```