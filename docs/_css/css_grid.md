---
sidebar_label: CSS Grid
sidebar_position: 2
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import BrowserWindow from "@site/src/components/BrowserWindow/BrowserWindow";
import GridLayout from "@site/src/components/cssExamples/GridLayout";
import GridDisplay from '@site/src/components/cssExamples/GridDisplay'

# CSS Grid

CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.

## Grid Display

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Set 3 grid rows*/
}
```

<BrowserWindow>
<GridDisplay />
</BrowserWindow>

## How to setup grid placement

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.one {
  grid-column: span 2; /* takes x columns */
  grid-row: span 1; /* takes x rows*/
}

.three {
  grid-column: span 1; /* takes x columns */
  grid-row: span 2; /* takes x rows*/
}
```

<BrowserWindow>
<GridDisplay placement={true} />
</BrowserWindow>

## How to setup a basic page structure using CSS Grid

```mdx-code-block
<Tabs>
<TabItem value="HTML">
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- <link rel="stylesheet" href="./styles.css"> -->
    <title>Document</title>
  </head>
  <body>
    <div class="outer_container">
      <div class="container header"><h1>Header</h1></div>
      <div class="container sidebar"><h1>Sidebar</h1></div>
      <div class="container main"><h1>Main</h1></div>
      <div class="container footer"><h1>Footer</h1></div>
    </div>
  </body>
</html>
```

```mdx-code-block
</TabItem>
<TabItem value="CSS">
```

```css
.outer_container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.container {
  border: black 0.5em solid;
  margin: 1em;
  text-align: center;
}

.header {
  grid-column: span 3;
}

.sidebar {
  grid-column: span 1;
  grid-row: span 3;
}

.main {
  grid-column: span 2;
  grid-row: span 2;
  height: 50vh;
}

.footer {
  grid-column: span 2;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

<BrowserWindow>
    <GridLayout/>
</BrowserWindow>
