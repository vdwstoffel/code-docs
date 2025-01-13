---
sidebar_label: "DOM"
sidebar_position: 6
---

# DOM Manipulation

## Getting Started

```
├── index.html
└── script.js
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- Other html -->
    // highlight-next-line
    <script src="./script.js"></script>
  </body>
</html>
```

## Selecting Elements

Find first element

```js
const backdrop = document.querySelector(".backdrop");
console.dir(backdrop); // see object properties
```

Find all elements. Return a list of elements

```js
const backdrop = document.querySelectorAll(".backdrop");
console.dir(backdrop); // see object properties
```

## EventListeners

### Mouse Click

```js
document.querySelector("button").addEventListener("click", () => {
  console.log("Button Clicked");
});
```

### Keystroke

```js
document.querySelector("input").addEventListener("keydown", () => {
  console.log("Key pressed down");
});

document.querySelector("input").addEventListener("keyup", () => {
  console.log("Key Released");
});
```

### Submit

Prevent the form from submitting and reloading the page

```js
const form = document.querySelector("#form")
const username = document.querySelector("#username");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(username.value)
})
```

### Inspecting element

```js
document.querySelector("input").addEventListener("keydown", (e) => {
  console.log(e);
});

//KeyboardEvent {isTrusted: true, key: 'a', code: 'KeyA', location: 0, ctrlKey: false, …}
```

## Adding/Removing classes

```js
document.querySelector(".btn").classList.add("hidden");
document.querySelector(".btn").classList.remove("hidden");

//toggle class
document.querySelector(".btn").classList.toggle("hidden");
```

## Manipulating Elements

```js
const text = document.querySelector("p");

text.innerText = "Hello World";
```
