---
sidebar_label: "CSS"
sidebar_position: 1
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import cssLogo from "@site/static/img/css.png"
import DisplayLogo from "@site/src/components/DisplayLogo"
import Position from "@site/src/components/cssExamples/Position"
import GridDisplay from '@site/src/components/cssExamples/GridDisplay'
import Transition from '@site/src/components/cssExamples/Transition'
import Transform from '@site/src/components/cssExamples/Transform'

import BrowserWindow from "@site/src/components/BrowserWindow/BrowserWindow";

# CSS

<DisplayLogo logo={cssLogo} />

CSS is a stylesheet language that is used to control the look and feel of a website. It is used to style web pages written in HTML and XHTML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.

## Include Stylesheet in HTML

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- set the path to css file-->
  // highlight-next-line
  <link rel="stylesheet" href="path/to/file.css" />
  <title>Document</title>
</head>
```

## Reset all css values

```css
* {
  /* The width and height of the element include the content, padding, and border. */
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
```

## Positioning

| Position Value | Description                                                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `static`       | **Default**: Elements are positioned in the normal flow of the document. They are not affected by the `top`, `bottom`, `left`, or `right` properties.             |
| `relative`     | Elements are positioned relative to their normal position in the document flow. You can use `top`, `bottom`, `left`, or `right` properties to offset the element. |
| `absolute`     | Elements are removed from the normal document flow and positioned relative to the nearest positioned ancestor (or the initial containing block if none).          |
| `fixed`        | Elements are positioned relative to the viewport (the browser window). They do not move when the page is scrolled.                                                |
| `sticky`       | Elements are positioned based on the user's scroll position. They behave like `relative` until they reach a specified offset, then they become `fixed`.           |

```mdx-code-block
<Tabs>
<TabItem value="Relative">
```

Elements are positioned relative to their normal position in the document flow. You can use `top`, `bottom`, `left`, or `right` properties to offset the element.

```css
position: relative;
top: 30%;
left: 60%;
```

<BrowserWindow>
<Position position={"relative"} top={"30%"} left={"60%"}/>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Absolute">
```

Elements are removed from the normal document flow and positioned relative to the nearest positioned ancestor (or the initial containing block if none).

```css
position: absolute;
top: 30%;
left: 30%;
```

<BrowserWindow>
<Position position={"absolute"} top={"30%"} left={"30%"}/>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Sticky">
```

Elements are positioned based on the user's scroll position. They behave like relative until they reach a specified offset, then they become fixed.

```css
position: sticky;
top: 20%; /* space between element and parent*/
```

<BrowserWindow>
<Position position={"sticky"} top={"20%"} />
</BrowserWindow>

```mdx-code-block
</TabItem>
</Tabs>
```

### Absolute-Realtive

```css
.grey {
  position: relative;
}

.red {
  position: absolute;
  bottom: 10%;
  left: 10%;
}

.black {
  position: absolute;
  right: 10%;
  bottom: 10%;
}
```

<BrowserWindow>
<div style={{width: "300px", height: "300px", position: "relative", backgroundColor: "grey", margin: "auto" }}>
  <div style={{width: "200px", height: "200px", position: "absolute", bottom: "10%", left: "10%", backgroundColor: "red"}}>
    <div style={{width: "100px", height: "100px", position: "absolute", bottom: "10%", right: "10%", backgroundColor: "black"}}></div>
  </div>
</div>
</BrowserWindow>

## Overflow

```css
div {
  overflow: auto;
}
```

<BrowserWindow>
<div style={{width: "200px", height: "100px", overflow: "auto", backgroundColor: "orange", color: "black", padding: "0.5em", margin: "auto"}}>
  You can use the overflow property when you want to have better control of the layout. The overflow property specifies
  what happens if content overflows an element's box.
</div>
</BrowserWindow>

## Layout

### Center Page

```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

### Center Item in div

```css
.item {
  margin: auto;
}
```

### Center horizontal and vertical

```css
.container {
  text-align: center;
  height: 200px;
  width: 400px;
  position: relative;
  border: 3px solid green;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
```

```html
<div class="container">
  <div class="center">
    <p>I am vertically and horizontally centered.</p>
  </div>
</div>
```

<BrowserWindow>
<div style={{
  textAlign: "center",
  height: "200px",
  width: "400px",
  position: "relative",
  border: "3px solid green",
}}>
  <div style={{
  margin: "0",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
}}>
    <p>I am vertically and horizontally centered.</p>
  </div>
</div>
</BrowserWindow>

## Background

```css
background-image: url("./images/background-img.jpg");
background-repeat: no-repeat;

background-size: 100% 50%; /* Set width and height */
background-size: cover; /* auto scale to never have white space */

background-position: 0% 10%; /* left edge, amount to crop at top*/
background-position: center; /* Crop same amount top and bottom */

background-image: linear-gradient(
  145deg,
  red 20%,
  blue 60%,
  green
); /* direction , color (when to transition)*/
/*               shape (circle/ ellipse) size   left, top     start transition */
background-image: radial-gradient(circle 50em at 10% 80%, red 20%, blue);

/* Stack background - first option, second option fallback*/
background: linear-gradient(), url(), #ff1b68;

/* Add filer */
filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);
```

## Borders

```mdx-code-block
<Tabs>
<TabItem value="Borders">
```

```css
.container {
  border-width: 0.5em;
  border-style: solid;
  border-color: black;
}
```

<BrowserWindow>
<div style={{padding: "1.5em"}}>
<div style={{width: "300px", height: "300px", backgroundColor: "darkgreen", margin: "auto", borderWidth: "0.5em", borderStyle: "solid", borderColor: "black"}} ></div>
</div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Border Raduis">
```

```css
.container {
  border: solid black 1em; /* shorthand */
  border-radius: 5%;
}
```

<BrowserWindow>
<div style={{padding: "1.5em"}}>
<div style={{width: "300px", height: "300px", backgroundColor: "darkgreen", margin: "auto", borderWidth: "0.5em", borderStyle: "solid", borderColor: "black", borderRadius: "5%"}} ></div>
</div>
</BrowserWindow>

```mdx-code-block
</TabItem>
</Tabs>
```

## Sizing

| Unit / Size | Description                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------ |
| `px`        | Fixed unit of measurement. Provides precise control but doesn't adapt well to different screens. |
| `%`         | Relative to the parent element's size. Useful for responsive layouts.                            |
| `em`        | Relative to the font size of the element itself. Good for text-related sizing.                   |
| `rem`       | Relative to the root (HTML) font size. More predictable than `em`.                               |
| `vw`        | Relative to the viewport's width, useful for responsive designs.                                 |
| `vh`        | Relative to the viewport's height, often used for responsive layouts.                            |

## Transition

CSS transition properties are used to add smoothness and animation to the web pages. The transition properties are used to change property values smoothly (over a given duration).

| Property                     | Description                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `transition`                 | A shorthand property for setting the four transition properties into a single property |
| `transition-delay`           | Specifies a delay (in seconds) for the transition effect                               |
| `transition-duration`        | Specifies how many seconds or milliseconds a transition effect takes to complete       |
| `transition-property`        | Specifies the name of the CSS property the transition effect is for                    |
| `transition-timing-function` | Specifies the speed curve of the transition effect                                     |

```mdx-code-block
<Tabs>
<TabItem value="Single Property">
```

```css
.single {
  width: 100px;
  transition: width 2s;
}

.single:hover {
  width: 300px;
}
```

<BrowserWindow>
<Transition value={"single"} />
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Multiple properties">
```

```css
.multiple {
  width: 100px;
  background: red;
  transition: width 2s, background-color 4s;
}

.multiple:hover {
  width: 300px;
  background-color: rgb(51, 182, 186);
}
```

<BrowserWindow>
<Transition value={"multiple"} />
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Adding a delay">
```

```css
.delay {
  width: 100px;
  transition: width 2s;
  transition-delay: 1s;
}

.delay:hover {
  width: 300px;
}
```

<BrowserWindow>
<Transition value={"delay"} />
</BrowserWindow>

```mdx-code-block
</TabItem>
</Tabs>
```

## Transform

The `transform` property allows you to rotate, scale, move, and skew elements. The `transform` property applies a 2D or 3D transformation to an element.

| Function      | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| `rotate()`    | Rotates the element by a specified number of degrees clockwise |
| `scale()`     | Increases or decreases the size of an element                  |
| `translate()` | Moves the element along the X-axis and Y-axis                  |

```mdx-code-block
<Tabs>
<TabItem value="Rotate">
```

```css
transform: rotate(180deg);
```

<BrowserWindow>
<Transform property={"rotate"} />
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Scale">
```

```css
transform: scale(150%);
```

<BrowserWindow>
<Transform property={"scale"} />
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Translate">
```

```css
transform: translateX(30%); /* moving the element along the X-axis */
transform: translateY(30%); /* moving the element along the Y-axis */
transform: translate(
  30%,
  30%
); /* moving the element along the X- and the Y-axis */
```

<BrowserWindow>
<Transform property={"translate"} />
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Transform + Transition">
```

```css
.tt {
  transition: transform 4s;
}

.tt:hover {
  transform: rotate(360deg);
}
```

<BrowserWindow>
<Transform property={"tt"} />
</BrowserWindow>

```mdx-code-block
</TabItem>
</Tabs>
```

## CSS Variables

```css
:root {
  --success-color: #2ecc71;
  --error-color: #e74c3c;
}

.success {
  border-color: var(--success-color);
}

.error {
  border-color: var(--error-color);
}
```

## Font Awesome

Adding Font Awesome

```html
<link
  rel="stylesheet"
  href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
  integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
  crossorigin="anonymous"
/>
```
