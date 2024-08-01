---
sidebar_label: "Express"
sidebar_position: 2
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

router.route("/").get(birdsController.getAllBirds).post(birdsController.addBird);

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

## Routing

### Response Methods

| Method           | Description                                 |
| ---------------- | ------------------------------------------- |
| `res.send()`     | Send a response of various types.           |
| `res.status()`   | Add the status code in brackets and send it |
| `res.json()`     | Send a JSON response.                       |
| `res.redirect()` | Redirect a request.                         |
| `res.render()`   | Render a view template.                     |
| `res.download()` | Prompt a file to be downloaded.             |

### How to add a default error route

If no routes match, this route will be called

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Hello World" });
});

//highlight-start
app.all("*", (req, res) => {
  res.status(404).json({ status: "failure", message: `Cant find ${req.originalUrl}` });
});
//highlight-end

app.listen(3000);
```

### How to add dynamic routes

`mysite.com/api/tours/5`

```javascript
app.get("/api/tours/:tourId", (req, res) => {
  const id = req.params.tourId; // 5
  res.status(200).json({ status: "success" });
});
```

### How to add nested routes

This option allows you to access the params of parent routers.

In this example, router2 is a middleware for router1. When a request is made to /post/:postId/comment/:commentId, router2 can access the postId param from router1 because mergeParams is set to true.

```js
const express = require("express");
const router1 = express.Router();
const router2 = express.Router({ mergeParams: true });

// Define a route on router1
router1.get("/post/:postId", (req, res) => {
  res.send("Post ID is: " + req.params.postId);
});

// Define a route on router2
router2.get("/comment/:commentId", (req, res) => {
  res.send("Post ID is: " + req.params.postId + ", Comment ID is: " + req.params.commentId);
});

// Use router2 as a middleware for router1
router1.use("/post/:postId", router2);

// Create an Express app and use router1
const app = express();
app.use("/", router1);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

```
// http://localhost:3000/post/3             => Post ID is: 3
// http://localhost:3000/post/3/comment/4   => Post ID is: 3, Comment ID is: 4
// http://localhost:3000/comment/4          => Cannot GET /comment/4 Since the route was never mounted
```

### How to chain methods on a route

```javascript
app
  .route("/book")
  .get((req, res) => {
    res.send("Get a random book");
  })
  .post((req, res) => {
    res.send("Add a book");
  })
  .put((req, res) => {
    res.send("Update the book");
  })
  .patch((req, res) => {
    res.send("Patch the book");
  })
  .delete((req, res) => {
    res.send("Delete the book");
  });
```

### How to parse query parameters

`/api/tours?duration=5&difficulty=easy`

```js
app.get("/api/tours", (req, res) => {
  console.log(req.query);
  // { duration: '5', difficulty: 'easy' }
});
```

### How to remove fields from query

Remove unwanted field from the query params

```js
const queryObj = { ...req.query }; // destructure to create new copy
const excludeFields = ["page", "sort", "limit", "fields"]; // exclude from the params
excludeFields.forEach((el) => delete queryObj[el]); // delete from the object
console.log(queryObj);
```

## Middleware

### How to run middleware on each request

Using `app.use()` will run the middleware on each request

```javascript
const logger = (req, res, next) => {
  console.log("Hello Middleware");
  next(); // call next otherwise middleware will not complete
};

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World");
});
```

### How to run middleware on specific routes

Run middleware on each `'api'` route

```javascript
const logger = (req, res, next) => {
  console.log("Hello Middleware");
  next(); // call next otherwise middleware will not complete
};

app.use("/api", logger);

app.get("/api", (req, res) => {
  res.send({ route: "api", date: "Today" });
});
```

### How to run middleware on particular requests

Run middleware on a specific route

```javascript
const protect = (req, res, next) => {
  console.log("This route is protected");
  next(); //  call next middleware. If no next, the request will hang
};

app.get("/secret", protect, (req, res) => {
  res.send("This is a secret route");
});
```

### How to add data to the request object

Add data to the request object and pass it to the next middleware

It will be available in the next middleware

```js
const addName = (req, res, next) => {
  req.name = "John Doe";
  next();
};

app.get("/", addName, (req, res) => {
  res.send(`Hello ${req.name}`);
});
```

### How to chain middleware

```js
app.get("/", middlewareOne, middlewareTwo, (req, res) => {
  // ...
});
```

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

```js title="main.js"const express = require("express");
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
