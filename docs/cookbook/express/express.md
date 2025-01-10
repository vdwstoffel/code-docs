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

## How to secure HTTP response headers

```bash
npm i helmet
```

Helmet helps secure Express apps by setting HTTP response headers.

```js
import express from "express";
import helmet from "helmet";
const app = express();

// highlight-next-line
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(8000);
```

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

## Error Handeling

### How to setup a custom error class

<Tabs>
<TabItem value="Server">

```js
const express = require("express");
const app = express();

// Import the custom errors utility
const AppError = require("./utils/appError");
const catchAsync = require("./utils/catchAsync");

// Normal Error, Use return to go directly to global error function
app.get("/", (req, res, next) => {
  //... some error
  return next(new AppError(`Some error`, 404));
});

// Async Error: wrap in catchAsync to offload errors
app.get(
  "/sw",
  catchAsync(async (req, res, next) => {
    const result = await fetch("https://swapi.dev/api/pele/1/");
    const se = await result.json();

    if (!se) {
      return next(new AppError(`Some error`, 404));
    }

    res.status(200).json({ status: "success", data: se });
  })
);

// Handle all other routes not defined above
app.all("*", (req, res, next) => {
  // Pass an error to the next middleware with a custom error message and status code
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  // Set the status code to the error's statusCode or default to 500 (Internal Server Error)
  err.statusCode = err.statusCode || 500;
  // Set the status message to the error's status or default to "Unknown error"
  err.status = err.status || "Unknown error";
  // Send an error response with the status code and error message as JSON
  res.status(err.statusCode).json({ status: err.status, message: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

</TabItem>
<TabItem value="utils/appError.js">

Errors will be passed to the global error handler in server

```js
// Define a custom error class extending the built-in Error class
class AppError extends Error {
  constructor(message, statusCode) {
    // Call the Error class constructor and set the message property
    super(message);

    // Custom properties specific to the AppError class
    this.statusCode = statusCode; // HTTP status code associated with the error
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Determine status based on statusCode
    this.isOperational = true; // Indicates if the error is operational

    // Captures the stack trace, excluding the constructor call from the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export the AppError class to be used in other modules
module.exports = AppError;
```

</TabItem>
<TabItem value="utils/catchAsync.js">

```js
// A function called catchAsync that takes another function (fn) as an argument
module.exports = (fn) => {
  // Returns a new function that accepts req, res, and next as parameters
  return (req, res, next) => {
    // Executes the provided function (fn) with req, res, and next,
    // and catches any errors thrown by it using .catch(next)
    fn(req, res, next).catch(next);
  };
};
```

</TabItem>
</Tabs>

### How to setup a universal error handler for unhandled rejections

```js
const server = app.listen(port);

process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  server.close().then(process.exit(1));
});
```

## Working with Files

### How to upload files

```bash
npm i multer
```

```js title="upload.js"
const multer = require("multer");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // filename
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
```

```js title="main.js"
const express = require("express");
const app = express();

// Require the upload middleware
const upload = require("./upload");

// Set up a route for file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  // Handle the uploaded file
  res.json({ message: "File uploaded successfully!" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);
```

### How to upload and resize image

```bash
npm i sharp
npm i multer
```

```js
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage(); // save in memory to pass to image processing

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image", 400), false); // custom error function
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
module.exports.uploadUserPhoto = upload.single("photo");

module.exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next(); // go to the next middleware if there is no file

  sharp(req.file.buffer) // get image stored in memory
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`path/to/destination`);

  next();
};
```

### How to download files

```js
const express = require("express");
const app = express();

// Downloading a file
app.get("/download", (req, res) => {
  res.download("./uploads/filename.txt");
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

## How to limit api calls from ip

```bash
npm i express-rate-limit
```

```js title="main.js"
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  limit: 5,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests. Try again in an hour",
});

app.use(limiter); // use globally
app.use("/api", limiter); // use on /api route
```

## Sanitize Input

Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params. Works with Express, Restify, or any other Connect app.

```bash
npm i xss-clean
```

```js
const express = require("express");
const app = express();
//highlight-next-line
const xss = require("xss-clean");

//highlight-start
// make sure this comes before any routes
app.use(xss());
//highlight-end

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000);
```

## Usefull Middleware

### How to watch for changes

```bash
npm install nodemon --save-dev
```

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
},
"devDependencies": {
  "nodemon": "^1.18.11"
}
```

```bash
npm run dev
```

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
