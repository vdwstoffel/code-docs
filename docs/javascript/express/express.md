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

## Error route

Add this as the last route. When no routes match this route will run

```javascript
app.use((req, res) => {
  res.status(404).json({ status: "failure", message: "Failure Message" });
});
```

## Route methods

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
  res.status(201).json({ status: "success", data: { info: mydata } });
});
```

When receiving **html form** data

```js
app.use(express.urlencoded({ extended: true }));

app.post("/api", (req, res) => {
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
/app.get("/api/tours/:tourId", (req, res) => {
    const id = req.params.tourId // 5
    res.status(200).json({ status: "success", data: {tours: tourData[id]} })
})
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
