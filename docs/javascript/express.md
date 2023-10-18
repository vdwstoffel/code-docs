---
sidebar_label: "Express"
sidebar_position: 2
---

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

## Route methods

```javascript
// GET method route
app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

// POST method route
app.post("/", (req, res) => {
  res.send("POST request to the homepage");
});
```

## Route Parameters

```javascript
// http://localhost:3000/users/stoffel/books/mtg
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params); // {"userId":"stoffel","bookId":"mtg"}
});
```

## Response Methods

| Method             | Description                                                                           |
| ------------------ | ------------------------------------------------------------------------------------- |
| `res.download()`   | Prompt a file to be downloaded.                                                       |
| `res.end()`        | End the response process.                                                             |
| `res.json()`       | Send a JSON response.                                                                 |
| `res.jsonp()`      | Send a JSON response with JSONP support.                                              |
| `res.redirect()`   | Redirect a request.                                                                   |
| `res.render()`     | Render a view template.                                                               |
| `res.send()`       | Send a response of various types.                                                     |
| `res.sendFile()`   | Send a file as an octet stream.                                                       |
| `res.sendStatus()` | Set the response status code and send its string representation as the response body. |

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

## Controllers

```javascript title="controllers/birds.js"
const express = require("express");
const router = express.Router();

// define the home page route
router.get("/", (req, res) => {
  res.send("Birds home page");
});
// define the about route
router.get("/about", (req, res) => {
  res.send("About birds");
});

module.exports = router;
```

```javascript title="app.js"
const express = require("express");
const app = express();

const birds = require("./controllers/birds");
// ...
app.use("/birds", birds);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
```

## Middleware

### Run on each request

```javascript
const addDate = (req, res, next) => {
  req.addDate = new Date().toISOString();
  next(); // call next middleware. If no next, the request will hang
};
app.use(addDate); // add the middleware to each request

app.get("/", (req, res) => {
  console.log(req.addDate); //send the date that was assigned with the middleware
  res.send("Hello World");
});
```

### Run on particular requests

```javascript
app.use("/api", (req, res, next) => {
  console.log("Api route used");
  next(); // call next middleware. If no next, the request will hang
});

app.get("/api", addDate, (req, res) => {
  res.send({ route: "api", date: "Today" });
});
```

### Middleware on specific routes

```javascript
const protect = (req, res, next) => {
  console.log("This route is protected");
  next(); //  call next middleware. If no next, the request will hang
};

app.get("/secret", protect, (req, res) => {
  res.send("This is a secret route");
});
```

## Error route

Add this as the last route. When no routes match this route will run

```javascript
app.use((req, res) => {
  res.status(404).send("Not Found");
});
```

## Templates

### EJS

```bash
npm i ejs
```

```bash
.
├── app.js
├── models
│   └── userModel.js
├── public
│   └── css
│       └── style.css
└── views
    └── index.ejs
```

```javascript
"use strict";

const express = require("express");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the directory for the views
app.set("views", __dirname + "/views");

// Use the built-in middleware to serve static files from the 'public' directory
app.use(express.static("public"));

// routes
router.get("/users", async (req, res) => {
  res.render("index", { user: "Stoffel" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/styles.css" />
    <!-- the css root will be set to public -->
    <title>Users Example</title>
  </head>
  <body>
    <h1><%= user %></h1>
  </body>
</html>
```

#### Includes

```html title="header.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/styles.css" />
    <!-- the css root will be set to public -->
    <title><%= title %></title>
  </head>
```

```html
<%- include('header') %> <!-- Include any files in this page -->
<body>
    <h1>Welcome to Express</h1>
</body>
</html>
```

### Post data to server

```html
<form action="/" method="post">
  <input type="text" name="num1" id="" placeholder="Weight" />
  <input type="text" name="num2" placeholder="Height" />
  <button type="submit" name="submit">Calculate</button>
</form>
```

```javascript
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const { num1, num2 } = req.body;
});
```
