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
