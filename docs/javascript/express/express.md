---
sidebar_label: "Express"
sidebar_position: 2
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

## Authentication

### Sending a JSON web token

```bash
npm i jsonwebtoken
```

Secret should be at least 32 characters

```mdx-code-block
<Tabs>
<TabItem value="Sign">
```

```js
/* jwt.sign(payload, secretOrPrivateKey, [options, callback]) */

const token = jwt.sign({ id: userID }, "superSecret", { expiresIn: "1w" });
```

```mdx-code-block
</TabItem>
<TabItem value="Verify">
```

```js
const token = req.headers.authorization;

/* jwt.verify(token, secretOrPublicKey, [options, callback]) */
const verifiedToken = jwt.verify(token, "superSecret");
```

```mdx-code-block
</TabItem>
</Tabs>
```

```js
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  const token = jwt.sign({ id: "901001" }, "superSecret", { expiresIn: "1w" });
  res.status(200).json({ status: "success", token: token });
});

// post request: headers Bearer aasfwrwetwet...
app.post("/", (req, res) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1]; // split between token and header an take the header
  try {
    const verifiedToken = jwt.verify(token, "superSecret");
    res.status(200).json({ status: "success", message: verifiedToken });
  } catch (err) {
    res.status(401).json({ status: "fail", message: err });
  }
});

app.listen(3000);
```

```mdx-code-block
<Tabs>
<TabItem value="Get">
```

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQxYjA0MWZhNGRlODg5YjQzMmUzMiIsImlhdCI6MTcwMDYwNTM5MSwiZXhwIjoyMzA1NDA1MzkxfQ.YlPIU9hlzpt6SEXA-gD1Y2RKv6-eWU4RrgagXST9Uzg"
}
```

```mdx-code-block
</TabItem>
<TabItem value="Post: success">
```

```js
"status": "success",
    "message": {
        "id": "901001",
        "iat": 1700675405,
        "exp": 1701280205
    }
```

```mdx-code-block
</TabItem>
<TabItem value="Post: fail">
```

```js
 "status": "fail",
    "message": {
        "name": "JsonWebTokenError",
        "message": "invalid token"
    }
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Cookies

| Property | Type    | Description                                                                               |
| -------- | ------- | ----------------------------------------------------------------------------------------- |
| expires  | Date    | Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie. |
| secure   | Boolean | Marks the cookie to be used with HTTPS only.                                              |
| httpOnly | Boolean | Flags the cookie to be accessible only by the web server.                                 |

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // Set a cookie named 'myCookie' with a value of 'Hello World'
  res.cookie("myCookie", "Hello World", { expires: new Date(Date.now() + 900000), secure: true, httpOnly: true });
  res.status(200).json({ message: "Cookie has been set" });
});

app.listen(3000);
```

### Cookie-Parser

cookie-parser is a middleware in Express.js that parses Cookie header and populates req.cookies with an object keyed by the cookie names.

```bash
npm i cookie-parser
```

```js
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Cookies: ", req.cookies);
});

app.listen(3000);
```

[see more](https://expressjs.com/en/5x/api.html#res.cookie)

### How to Protect an API route

```js
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to check the validity of the token
const checkToken = (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1]; // Extract the token from the Authorization header
  try {
    jwt.verify(token, "superSecret"); // Verify the token using the secret key
    next(); // Move to the next middleware if the token is valid
  } catch (err) {
    throw err; // Throw an error to the global error handler if the token is invalid
  }
};

app.get("/", (req, res) => {
  const token = jwt.sign({ id: "901001" }, "superSecret", { expiresIn: "1w" });
  // Generate a new token with a payload and sign it with the secret key
  res.status(200).json({ status: "success", token: token }); // Respond with the generated token
});

// Protected route that requires a valid token (GET request to '/secret')
app.get("/secret", checkToken, (req, res) => {
  // This route is protected and requires a valid token, enforced by the checkToken middleware
  res.status(200).json({ status: "success", message: "You reached the protected area" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  // Handle errors thrown by the checkToken middleware or other parts of the application
  res.status(400).json({ status: "denied", message: "No Valid Token" }); // Respond with an error message
});

app.listen(3000);
```

### Implement a password Reset

Given 2 routes

```js
router.route("/resetPasswordRequest").post(userController.resetPasswordRequest);
router.route("/resetPassword/:resetToken").post(userController.resetPassword);
```

In your authController is your resetPasswordRequest function

```js title=auth.js
module.exports.resetPasswordRequest = async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModel.getUserByEmail(email); // db function to get user by email

  const resetToken = uuidv4(); // npm i uuid
  await UserModel.passwordResetRequest(email, resetToken);

  const options = {
    email: user.email,
    firstName: user.firstName,
    resetToken: resetToken, // send the unhashed token per email
  };

  SendPasswordResetEmail(options); // custom email function to send the email

  res.status(200).json({
    status: "success",
    message: "Password reset email sent",
  });
};
```

```js title=db.js
const crypto = require("crypto");

module.exports.passwordResetRequest = async (email, token) => {
  // Using encryptPassword (bcrypt) will make it impossible to find since it gets salted
  // instead use createHash function from crypto library
  const encryptedToken = crypto.createHash("sha256").update(token).digest("hex");
  const expiry15min = new Date(Date.now() + 15 * 60 * 1000);

  const res = await User.update(
    { passwordResetToken: encryptedToken, passwordResetExpires: expiry15min },
    { where: { email: email } }
  );

  return res;
};
```

```js
module.exports.resetPassword = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const resetToken = req.params.resetToken;

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  const user = await UserModel.getUserByResetToken(resetToken);

  if (!user) {
    return next(new AppError("Invalid token", 400));
  }

  // If no password request was made
  if (user.passwordResetExpires === null) {
    return next(new AppError("Invalid request", 400));
  }

  const currentTime = new Date(Date.now());
  if (currentTime > user.passwordResetExpires) {
    return next(new AppError("Token expired", 400));
  }

  await UserModel.resetPassword(user.email, password);
  const token = await createJWTToken(user.userId);

  res.status(200).json({
    status: "success",
    message: "Password reset successful",
    token: token,
  });
};
```

```js
module.exports.resetPassword = async (email, password) => {
  const hashedPW = await encryptPassword(password);
  await User.update(
    { password: hashedPW, passwordResetToken: null, passwordResetExpires: null, lastPasswordReset: new Date() },
    { where: { email: email }, returning: true }
  );
};
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

## Testing

### Demo App

#### App

```
├── app.js
├── birdsController.js
├── birdsModel.js
├── birdsRoute.js
├── package.json
├── package-lock.json
├── server.js
└── tests
    └── birds.test.js
```

```mdx-code-block
<Tabs>
<TabItem value="server.js">
```

```js
const app = require("./app");

app.listen(3000);
```

```mdx-code-block
</TabItem>
<TabItem value="app.js">
```

```js
const express = require("express");
const app = express();

const birdRouter = require("./birdsRoute");

app.use("/birds", birdRouter);

module.exports = app;
```

```mdx-code-block
</TabItem>
<TabItem value="birdsRouter.js">
```

```js
const express = require("express");
const router = express.Router();

const birdController = require("./birdsController");

router.route("/").get(birdController.getAllBirds).post(birdController.createBird);

module.exports = router;
```

```mdx-code-block
</TabItem>
<TabItem value="birdsController.js">
```

```js
module.exports.getAllBirds = async (req, res) => {
  res.status(200).json({ status: "success", data: { type: "bird" } });
};

// http://127.0.0.1:3000/birds?title=birds&text=all_birds
module.exports.createBird = async (req, res) => {
  const { title, text } = req.query;

  if (!title || !text) {
    return res.status(400).json({ status: "error", message: "Invalid Input" });
  }
  res.status(200).json({ status: "success", data: req.query });
};
```

```mdx-code-block
</TabItem>
<TabItem value="test/birds.test.js">
```

```mdx-code-block
</TabItem>
</Tabs>
```

#### Tests

```mdx-code-block
<Tabs>
<TabItem value="Mocha + Chai">
```

```bash
npm i -D mocha
npm i -D chai@4.3.6 # version ^5 only supports modules
npm i -D chai-http
npm i -D nyc        # code coverage
```

```js
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const should = chai.should();
chai.use(chaiHttp);

describe("Birds Route /Get", () => {
  it("Should return correct response", async () => {
    const res = await chai.request(app).get("/birds");
    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
  });
});

describe("Birds Controller /Post", () => {
  it("Should return success if all fields are filed in", async () => {
    const res = await chai.request(app).post("/birds?title=birds&text=all_birds");
    res.should.have.status(200);
    res.body.should.have.property("status").eql("success");
  });

  it("Should fail in not all fields are filled", async () => {
    const res = await chai.request(app).post("/birds?title=bird");
    res.should.have.status(400);
    res.body.should.have.property("message").eql("Invalid Input");
  });
});
```

```json title="package.json"
 "scripts": {
    "test": "mocha ./tests/*.test.js",
    "coverage": "nyc --reporter=text --reporter=lcov npm test"
  },
```

```bash
npm test
npm run coverage
```

```mdx-code-block
</TabItem>
<TabItem value="Jest + Supertest">
```

```bash
npm i -D jest
npm i -D supertest
```

```js
const request = require("supertest");
const app = require("../app");

describe("Get /birds", () => {
  beforeAll(() => {
    console.log("Setup");
  });

  afterAll(() => {
    console.log("Teardown");
  });

  it("Should get data", async () => {
    const res = await request(app).get("/birds");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.type).toBe("bird");
  });
});

describe("Post /birds", () => {
  it("Should fail if params are wrong", async () => {
    const res = await request(app).post("/birds?title=birds");
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Invalid Input");
  });

  it("Should pass if params are correct", async () => {
    const res = await request(app).post("/birds?title=birds&text=all_birds");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("birds");
    expect(res.body.data.text).toBe("all_birds");
  });
});
```

```json
 "scripts": {
    "test": "jest --testTimeout=5000",
    "coverage": "npx jest --coverage"
  },
```

```bash
npm test
npm run coverage
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Test Skeleton Examples

```mdx-code-block
<Tabs>
<TabItem value="GET">
```

```js
describe("GET /api/products/:id", () => {
  it("should return a product", async () => {
    const res = await request(app).get("/api/products/6331abc9e9ececcc2d449e44");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Product 1");
  });
});
```

```mdx-code-block
</TabItem>
<TabItem value="POST">
```

```js
describe("POST /api/products", () => {
  it("should create a product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Product 2",
      price: 1009,
      description: "Description 2",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Product 2");
  });
});
```

```mdx-code-block
</TabItem>
<TabItem value="PUT">
```

```js
describe("PUT /api/products/:id", () => {
  it("should update a product", async () => {
    const res = await request(app).patch("/api/products/6331abc9e9ececcc2d449e44").send({
      name: "Product 4",
      price: 104,
      description: "Description 4",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(104);
  });
});
```

```mdx-code-block
</TabItem>
<TabItem value="DELETE">
```

```js
describe("DELETE /api/products/:id", () => {
  it("should delete a product", async () => {
    const res = await request(app).delete("/api/products/6331abc9e9ececcc2d449e44");
    expect(res.statusCode).toBe(200);
  });
});
```

```mdx-code-block
</TabItem>
</Tabs>
```
