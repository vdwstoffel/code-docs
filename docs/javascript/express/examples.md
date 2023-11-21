---
sidebar_label: "Examples"
sidebar_position: 2
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Examples

## Upload Files (Backend)

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

## Custom Error Class

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
  return next(new AppError(`Some error`, 404));;
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
module.exports = fn => {
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
