---
sidebar_label: "Express"
sidebar_position: 2
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Express

## Getting Started

```bash
npm i express
```

```javascript
const express = require("express");
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
```

## HTTP Response Headers

```bash
npm i helmet
```

Helmet helps secure Express apps by setting HTTP response headers.

```js
import express from "express";
import helmet from "helmet";

const app = express();

// Use Helmet!
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(8000);
```

## Error route

Add this as the last route. When no routes match this route will run

```javascript
app.all("*", (req, res) => {
  res.status(404).json({ status: "failure", message: `Cant find ${req.originalUrl}` });
});
```

## Route methods (Dynamic Routes)

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

## Route Parameters

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

## Query Params

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

## Response Methods

| Method           | Description                                 |
| ---------------- | ------------------------------------------- |
| `res.status()`   | Add the status code in brackets and send it |
| `res.json()`     | Send a JSON response.                       |
| `res.redirect()` | Redirect a request.                         |
| `res.render()`   | Render a view template.                     |

## app.route()

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

## MVC

MVC (Model-View-Controller) is a software architectural pattern that separates an application into three interconnected components: the data (Model), user interface (View), and application logic (Controller), facilitating better code organization and maintenance.

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

Now go to mysite.com/birds/

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

[See Examples](express/examples#custom-error-class)

### Universal error handler for Unhandled Rejections

```js
const server = app.listen(port);

process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  server.close().then(process.exit(1));
});
```

## Authentication

### JWT

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

### [How to protect routes](/javascript/express/examples#protecting-api-routes)

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
