---
sidebar_label: "Examples"
sidebar_position: 2
---

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
