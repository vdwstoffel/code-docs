---
sidebar_label: "HTML"
sidebar_position: 100
---

# HTML

## Getting Started

Highlighted: to add css and javascript

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    //highlight-next-line
    <link rel="stylesheet" href="style.css">
</head>
<body>
    //highlight-next-line
    <script src="script.js"></script>
</body>
</html>
```

## Forms

```html
<form action="" method="get">
    <label for="name">Name</label>
    <input id="name" type="text" placeholder="Enter Name" required/>

    <label for="email">Email</label>
    <input id="email" type="email" placeholder="Enter Email" required/>

    <label for="password">Password</label>
    <input id="password" type="password" required/>

    <button type="submit">Submit</button>
</form>
```
<div>
<form action="" method="get" onsubmit="return false;" style={{textAlign: "center"}}>
    <label for="name">Name</label>
    <input id="name" type="text" placeholder="Enter Name" required/>
    <label for="email">Email</label>
    <input id="email" type="email" placeholder="Enter Email" required/>
    <label for="password">Password</label>
    <input id="password" type="password" required/>
    <button type="submit">Submit</button>
</form>
</div>

