---
sidebar_label: "Other"
sidebar_position: 6
---

# Other

## Axios

```bash
npm i axios
```

```javascript
"use strict";

const axios = require("axios"); // npm i axios
require("dotenv").config({ path: "../../.env" }); // npm i dotenv
const endpoint = process.env["FIREBASE"];

/***************
 ***** GET *****
 ***************/
const getData = async () => {
  try {
    const response = await axios.get(endpoint);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

/****************
 ***** POST *****
 ****************/
const postData = async () => {
  try {
    await axios.post(endpoint, { hello: "World" });
  } catch (err) {
    console.log(err);
  }
};

/***************
 ***** PUT *****
 ***************/
const putData = async () => {
  try {
    await axios.put(endpoint, { hello: "JavaScript" });
  } catch (err) {
    console.log(err);
  }
};

/******************
 ***** DELETE *****
 ******************/
const deleteData = async () => {
  try {
    await axios.delete(endpoint, { hello: "JavaScript" });
  } catch (err) {
    console.log(err);
  }
};
```

## dotenv

```bash
npm i dotenv
```

```javascript
/*  module that loads environment variables
 *   Create a .env file in the root of your project
 *   S3_BUCKET="YOURS3BUCKET"
 *   console.log(process.env)
 */
require("dotenv").config({ path: "../../.env" }); // npm i dotenv
console.log(process.env["FIREBASE"]);
```

## bcrypt

A library to help you hash passwords.

```bash
npm i bcrypt
```

```javascript
const bcrypt = require("bcrypt"); // npm i bcrypt

const saltRounds = 12;
const myPassword = "Stoffel";

const storePassword = async () => {
  const hashedPW = await bcrypt.hash(myPassword, saltRounds);
  return hashedPW;
};

const checkPassword = async (plain, hash) => {
  const result = await bcrypt.compare(plain, hash);
  return result;
};

storePassword().then((hashedPW) => {
  console.log(hashedPW);
  checkPassword(myPassword, hashedPW).then((result) => {
    console.log(result);
  });
});
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
