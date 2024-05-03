---
sidebar_label: "Templates"
sidebar_position: 2
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Templates

## EJS

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

### Includes

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
</html>
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

## Pug

### Getting Started

```bash
npm i pug
```

```
.
├── app.js
├── models
│   └── userModel.js
├── public
│   └── css
│       └── style.css
└── views
    └── index.pug
```

```js
const express = require("express");
const app = express();
const path = require("path");

// Set the view engine to pug
app.set("view engine", "pug");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Use the built-in middleware to serve static files from the 'public' directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).render("index", { title: "Home Page", message: "Welcome to our website!" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

```pug title="index.pug"
html
  head
    title= title
    link(rel='stylesheet', href='css/style.css')
  body
    // normal h1
    h1 Hello World
    // variable
    h1= message
    // text + varialbe
    h1 hello #{username}
```

### Adding class names

```pug
body
    //- in ccs we have a class name PageHeader
    header.PageHeader
```

### Using include

```
views
    └── index.pug
    └── header.pug
```

```pug title="header.pug"
header
  button
```

```pug title="main.pug"
include header

section.main
  h1 Hellow
```

### Extends

In Pug, you can use the extends keyword to inherit HTML structures from a base template

In this example, base.pug is the base template that provides a basic HTML structure. index.pug extends base.pug and fills in the content block with its own HTML.

```pug title="base.pug"
body
  h1 My Header
  block content
  h1 My Footer
```

```pug  title="index.pug"
extends base

block content
    p This is an index page
```
**index.pug** renders:

<html>
  <body>
    <h1>My Header</h1>
    <p>This is an index page</p>
    <h1>My Footer</h1>
  </body>
</html>

### Loops

```pug
each item in items
  p= item
```

### Mixin

Mixins in Pug are essentially functions that can be used to generate reusable pieces of HTML

```pug
mixin list(items)
  ul
    each item in items
      li= item

+list(['Item 1', 'Item 2', 'Item 3'])
```

<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

### Conditionals

```pug
- var user = 'John';

if user
  p Welcome back, #{user}!
else
  p Please log in.
```

## Locals

In Express.js, res.locals is an object that contains response local variables scoped to the request. These variables are available to the view during the rendering process.

```js
app.get('/', (req, res) => {
  res.locals.user = 'John';
  res.render('index');
});
```

```pug
if user
  p Welcome back, #{user}!
else
  p Please log in.
```