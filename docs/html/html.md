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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    //highlight-next-line
    <link rel="stylesheet" href="style.css" />
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
  <input id="name" type="text" placeholder="Enter Name" required />

  <label for="email">Email</label>
  <input id="email" type="email" placeholder="Enter Email" required />

  <label for="password">Password</label>
  <input id="password" type="password" required />

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

## Tables

```html
<table>
  <thead>
    <tr>
      <th colspan="2">The table header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The table body</td>
      <td>with two columns</td>
    </tr>
  </tbody>
</table>
```

<table>
  <thead>
    <tr>
      <th colspan="2">The table header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The table body</td>
      <td>with two columns</td>
    </tr>
  </tbody>
</table>

## Radio Button

```html
<p>Please select your favorite Web language:</p>
  <input type="radio" id="html" name="fav_language" value="HTML" />   <label for="html">HTML</label><br />
  <input type="radio" id="css" name="fav_language" value="CSS" />   <label for="css">CSS</label><br />
  <input type="radio" id="javascript" name="fav_language" value="JavaScript" />  
<label for="javascript">JavaScript</label>
```

<p>Please select your favorite Web language:</p>
  <input type="radio" id="html" name="fav_language" value="HTML"/>
  <label for="html">HTML</label><br/>
  <input type="radio" id="css" name="fav_language" value="CSS"/>
  <label for="css">CSS</label><br/>
  <input type="radio" id="javascript" name="fav_language" value="JavaScript"/>
  <label for="javascript">JavaScript</label>
