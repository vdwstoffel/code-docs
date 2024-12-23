---
sidebar_label: Middleware
sidebar_position: 3
---
# Middleware

## How to run middleware on each request

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

## How to run middleware on specific routes

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

## How to run middleware on particular requests

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

## How to add data to the request object

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

## How to chain middleware

```js
app.get("/", middlewareOne, middlewareTwo, (req, res) => {
  // ...
});
```
