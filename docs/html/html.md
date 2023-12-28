---
sidebar_label: "HTML"
sidebar_position: 100
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

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

## Lists

```mdx-code-block
<Tabs>
<TabItem value="Unordered List">
```

```html
<ul>
  <li>The opening tag</li>
  <li>The closing tag</li>
  <li>The actual element</li>
</ul>
```

<ul>
  <li>The opening tag</li>
  <li>The closing tag</li>
  <li>The actual element</li>
</ul>

```mdx-code-block
</TabItem>
<TabItem value="Ordered List">
```

```html
<ol>
  <li>The opening tag</li>
  <li>The closing tag</li>
  <li>The actual element</li>
</ol>
```

<ol>
  <li>The opening tag</li>
  <li>The closing tag</li>
  <li>The actual element</li>
</ol>

```mdx-code-block
</TabItem>
</Tabs>
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

## Image

```html
<img src="./post-img.jpg" alt="post-img" />
```
