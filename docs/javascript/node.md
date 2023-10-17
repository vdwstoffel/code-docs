# Node

## I/O

```javascript
const fs = require("fs");

fs.readFile("./asyncExample.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// File will always be overwritten
const text = "This is async code\n";
fs.writeFile("textOut.txt", text, "utf-8", (err) => {
  if (err) throw err;
  console.log("File ok");
});

// Append to the file
const textToAppend = "This line has been appended to the file\n";
fs.appendFile("./textOut.txt", textToAppend, (err) => {
  if (err) throw err;
  console.log("File appended check output");
});
```