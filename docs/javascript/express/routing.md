---
sidebar_label: Routing
sidebar_position: 1
---

# Routing

## Response Methods

| Method           | Description                                 |
| ---------------- | ------------------------------------------- |
| `res.send()`     | Send a response of various types.           |
| `res.status()`   | Add the status code in brackets and send it |
| `res.json()`     | Send a JSON response.                       |
| `res.redirect()` | Redirect a request.                         |
| `res.render()`   | Render a view template.                     |
| `res.download()` | Prompt a file to be downloaded.             |

## How to add a default error route

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

## How to add dynamic routes

`mysite.com/api/tours/5`

```javascript
app.get("/api/tours/:tourId", (req, res) => {
  const id = req.params.tourId; // 5
  res.status(200).json({ status: "success" });
});
```

## How to add nested routes

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

## How to chain methods on a route

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

## How to parse query parameters

`/api/tours?duration=5&difficulty=easy`

```js
app.get("/api/tours", (req, res) => {
  console.log(req.query);
  // { duration: '5', difficulty: 'easy' }
});
```

## How to remove fields from query

Remove unwanted field from the query params

```js
const queryObj = { ...req.query }; // destructure to create new copy
const excludeFields = ["page", "sort", "limit", "fields"]; // exclude from the params
excludeFields.forEach((el) => delete queryObj[el]); // delete from the object
console.log(queryObj);
```
