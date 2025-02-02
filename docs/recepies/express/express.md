---
sidebar_label: "Express"
sidebar_position: 1
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import expressLogo from "@site/static/img/expressjs.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

# Express

<DisplayLogo logo={expressLogo} />

[Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## How to setup basic MVC structure

MVC (Model-View-Controller) is a software architectural pattern that separates an application into three interconnected components: the data (Model), user interface (View), and application logic (Controller), facilitating better code organization and maintenance.

```
.
├── controllers
│   ├── birdsController.js
├── models
│   ├── birdsModel.js
├── routes
│   ├── birdsRoute.js
├── app.js
├── server.js
```

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```mdx-code-block
<Tabs>
<TabItem value="Dependancies">
```

```bash
npm i express
```

```mdx-code-block
</TabItem>
<TabItem value="birdsController.js">
```

```js title="controller/birdsController.js"
const Birds = require("../models/birdsModel");

module.exports.getAllBirds = async (req, res) => {
  // db logic
};

module.exports.addBird = async (req, res) => {
  // db logic
};
```

```mdx-code-block
</TabItem>
<TabItem value="birdsRouter.js">
```

```js title="routes/birdsRoute.js"
const express = require("express");
const router = express.Router();

const birdsController = require("../controller/birdsController");

router
  .route("/")
  .get(birdsController.getAllBirds)
  .post(birdsController.addBird);

module.exports = router;
```

```mdx-code-block
</TabItem>
<TabItem value="app.js">
```

```js title="app.js"
const express = require("express");
const app = express();

const birdsRouter = require("./routes/birdsRoutes");
// ...
app.use("/birds", birdsRouter);

export default app;
```

```mdx-code-block
</TabItem>
<TabItem value="server.js">
```

```js title="app.js"
const app = require("./app");

app.listen(3000);
```

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```mdx-code-block
<Tabs>
<TabItem value="Dependancies">
```

```bash title="Terminal"
npm init --yes
npm install express
npm install  -D typescript ts-node-dev @types/express
npx tsc --init
```

```json title='tsconfig.ts'
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
    // other options remain same
  }
}
```

```json title='package.json'
"scripts": {
  "build": "npx tsc",
  "start": "node dist/index.js",
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
},
```

```bash
npm run dev
```

```mdx-code-block
</TabItem>
<TabItem value="birdsController.ts">
```

```js title="controller/birdsController.ts"
import { RequestHandler } from "express";

import { getAllBirds } from "../models/birdsModel";

export const getBirds: RequestHandler = async (req, res) => {
  const birds = await getAllBirds();
  res.status(200).json({ birds });
};
```

```mdx-code-block
</TabItem>
<TabItem value="birdsRouter.ts">
```

```js title="routes/birdsRouter.ts"
import { Router } from "express";

const router = Router();

import { getBirds } from "../controllers/birdsController";

router.route("/birds").get(getBirds);

export default router;
```

```mdx-code-block
</TabItem>
<TabItem value="app.ts">
```

```js title="app.ts"
import express, { Request, Response, Application } from "express";

const app: Application = express();

import birdRouter from "./routes/birdsRouter";

app.use("/", birdRouter);

export default app;
```

```mdx-code-block
</TabItem>
<TabItem value="server.ts">
```

```js title="routes/server.ts"
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT);
```

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
</Tabs>
```

Now go to mysite.com/birds/

## How to receive data from as html form

```js
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post("/submit-form", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Now you can use the form data
  res.send(`Received data: ${username}, ${password}`);
});

app.listen(3000);
```

## Sending an email

```bash
npm i nodemailer
```

```mdx-code-block
<Tabs>
<TabItem value="mailer.js">
```

```js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0ab28d4be596ec",
    pass: "********c54c",
  },
});

export async function mailer() {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
```

```mdx-code-block
</TabItem>
<TabItem value="main.js">
```

```js
import express from "express";

import { mailer } from "./mailer.js";

const app = express();

app.get("/send", async (req, res) => {
  await mailer();
  res.status(200).json({ status: "succes", message: "Mail sent" });
});

app.listen(3000);
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Usefull Middleware


### Morgan

HTTP request logger middleware for node.js

```bash
npm install morgan
```

As early as possible add

```js
app.use(morgan("dev"));
```

### Paramter Poluttion

Express middleware to protect against HTTP Parameter Pollution attacks

ex `/api/getAll?sort=price&sort=date`

```bash
npm i hpp
```

```js
const express = require("express");
const app = express();
//highlight-next-line
const hpp = require("hpp");

app.use(bodyParser.urlencoded()); // Make sure the body is parsed beforehand.

//highlight-next-line
app.use(hpp());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000);
```

#### Whitelisting Specific Parameters

```js
// Secure all routes at first.
// You could add separate HPP middlewares to each route individually but the day will come when you forget to secure a new route.
app.use(hpp());

// Add a second HPP middleware to apply the whitelist only to this route.
app.use("/search", hpp({ whitelist: ["filter"] }));
```
