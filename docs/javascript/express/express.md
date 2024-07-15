---
sidebar_label: "Express"
sidebar_position: 1
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Express

## Getting Started

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```bash
npm i express
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```bash
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
</Tabs>
```

MVC (Model-View-Controller) is a software architectural pattern that separates an application into three interconnected components: the data (Model), user interface (View), and application logic (Controller), facilitating better code organization and maintenance.

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```js
.
├── controllers
│   ├── birdsController.js
├── models
│   ├── birdsModel.js
├── routes
│   ├── birdsRoute.js
├── app.js
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

```js title="routes/birdsRoute.js"
const express = require("express");
const router = express.Router();

const birdsController = require("../controller/birdsController");

router.route("/").get(birdsController.getAllBirds).post(birdsController.addBird);

module.exports = router;
```

```js title="app.js"
const express = require("express");
const app = express();

const birdsRouter = require("./routes/birdsRoutes");
// ...
app.use("/birds", birdsRouter);

app.listen(3000);
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```js
.
├── controllers
│   ├── birdsController.ts
├── models
│   ├── birdsModel.ts
├── routes
│   ├── birdsRoute.ts
├── app.ts
```

```js title="controller/birdsController.ts"
import { RequestHandler } from "express";

import { getAllBirds } from "../models/birdsModel";

export const getBirds: RequestHandler = async (req, res) => {
  const birds = await getAllBirds();
  res.status(200).json({ birds });
};
```

```js title="routes/birdsRouter.ts"
import { Router } from "express";

const router = Router();

import { getBirds } from "../controllers/birdsController";

router.route("/birds").get(getBirds);

export default router;

```

```js title="app.ts"
import express, { Request, Response, Application } from "express";

const app: Application = express();
const port = process.env.PORT || 8000;

import birdRouter from "./routes/birdsRouter";

app.use("/", birdRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

```

```mdx-code-block
</TabItem>
</Tabs>
```

Now go to mysite.com/birds/

## Routing

### Route methods

```mdx-code-block
<Tabs>
<TabItem value="Get">
```

```js
app.get("/api", (req, res) => {
  res.status(200).json({ status: "success", data: { info: mydata } });
});
```

```mdx-code-block
</TabItem>
<TabItem value="Post">
```

When receiving **json** data

```js
app.use(express.json());

app.post("/api", (req, res) => {
  const mydata = req.body;
  res.status(201).json({ status: "success", data: { info: mydata } });
});
```

When receiving **html form** data

```js
app.use(express.urlencoded({ extended: true }));

app.post("/api", (req, res) => {
  const mydata = req.body;
  res.status(201).json({ status: "success", data: { info: mydata } });
});
```

```mdx-code-block
</TabItem>
<TabItem value="Put/Patch">
```

```javascript
app.patch("/api/tours/:id", (req, res) => {
  const id = req.params.id;
  // do update logic
  res.status(200).json({ status: "success", data: { tours: selectedTour } });
});
```

```mdx-code-block
</TabItem>
<TabItem value="Delete">
```

```js
app.delete("/api/tours/:id", (req, res) => {
  const id = req.params.id;
  // delete logic
  res.status(202).json({ status: "success", data: null });
});
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Add default Error route

Add this as the last route. When no routes match this route will run

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

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
```

### Route Parameters (Dynamic Routing)

`mysite.com/api/tours/5`

```javascript
app.get("/api/tours/:tourId", (req, res) => {
  const id = req.params.tourId; // 5
  res.status(200).json({ status: "success", data: { tours: tourData[id] } });
});
```

### Nested Routes

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

### Response Methods

| Method           | Description                                 |
| ---------------- | ------------------------------------------- |
| `res.send()`     | Send a response of various types.           |
| `res.status()`   | Add the status code in brackets and send it |
| `res.json()`     | Send a JSON response.                       |
| `res.redirect()` | Redirect a request.                         |
| `res.render()`   | Render a view template.                     |
| `res.download()` | Prompt a file to be downloaded.             |

### Chain methods on a route

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
  });
```

### Add parameters to a query

`/api/tours?duration=5&difficulty=easy`

```js
app.get("/api/tours", (req, res) => {
  console.log(req.query);
  // { duration: '5', difficulty: 'easy' }
});
```

### Remove fields from query

Remove unwanted field from the query params

```js
const queryObj = { ...req.query }; // destructure to create new copy
const excludeFields = ["page", "sort", "limit", "fields"]; // exclude from the params
excludeFields.forEach((el) => delete queryObj[el]); // delete from the object
console.log(queryObj);
```

## Secure HTTP Response Headers

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

## Receiving Form Data

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


## Middleware

### Run on each request

`Hello Middleware` will be logged on each request

```javascript
app.use((req, res, next) => {
  console.log("Hello Middleware");
  next(); // call next otherwise middleware will not complete
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
```

### Middleware on specific routes

```javascript
app.use("/api", (req, res, next) => {
  console.log("Api route used");
  next(); // call next middleware. If no next, the request will hang
});

app.get("/api", (req, res) => {
  res.send({ route: "api", date: "Today" });
});
```

### Run on particular requests

```javascript
const protect = (req, res, next) => {
  console.log("This route is protected");
  next(); //  call next middleware. If no next, the request will hang
};

app.get("/secret", protect, (req, res) => {
  res.send("This is a secret route");
});
```

### Edit req method

You can also add a method to the request object

```js
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});
```

### Accessing parameters

Use `app.param()` to gain access to the passed parameters.

In the example below you have `/:id` so param = 5 if path is `/5`

```js
/*
 * Value refers the the passed param (:id)
 */
const invalid = (req, res, next, value) => {
  if (value > 5) {
    // return otherwise next will run
    return res.status(500).json({ status: "Error", response: "Invalid Param" });
  }
  next();
};

// assign middleware
app.param("id", invalid); // check if id is passed as a param

app.get("/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    response: "Good",
  });
});
```

### Chaining middleware

```js
app.get("/", middlewareOne, middlewareTwo, (req, res) => {
  // ...
});
```

## Error Handeling

### Custom Error Class

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

### Universal error handler for Unhandled Rejections

```js
const server = app.listen(port);

process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  server.close().then(process.exit(1));
});
```

## Working with Files

### Upload Files (Backend)

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

### Upload and resize Image

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

## Rate Limiting

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
