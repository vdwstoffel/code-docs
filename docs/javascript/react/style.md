---
sidebar_label: Styling Apps
sidebar_position: 3
---

# Styling Apps

| Style         | Description                    |
| ------------- | ------------------------------ |
| Inline Styles | Add styles directly to the JSX |
| Global Styles | Add styles to the entire app   |
| CSS Modules   | Scoped styles for components   |

## Adding a global stylesheet

```jsx
//highlight-next-line
import "./index.css";

export default function App() {
  return (
    <div className="container">
      <Header />
    </div>
  );
}
```

## Inline Styles

```jsx
export default function Header() {
  return <h1 style={{ color: "red", width: "3px"; }}>Fast React Pizza co.</h1>;
}
```

## How to add classes conditionally

```jsx
export default function Pizza({ name, ingredients }) {
  return (
    <li
      className={`pizza ${
        ingredients.includes("pepperoni") ? "pepperoni" : ""
      }`}
    >
      <h1>{name}</h1>
      <h2>{ingredients}</h2>
    </li>
  );
}
```

## CSS Modules

```bash
├── Pizza.jsx
├── Pizza.module.css
```

```css title=Pizza.module.css
.pizza {
  border: 1px solid black;
  padding: 1em;
}
```

```jsx title=Pizza.jsx
import styles from "./Pizza.module.css";

export default function Pizza({ name, ingredients }) {
  return (
    <li className={styles.pizza}>
      <h1>{name}</h1>
      <h2>{ingredients}</h2>
    </li>
  );
}
```

### How to add multiple classes with modules

```css title=Pizza.module.css
.pizza {
  border: 1px solid black;
  padding: 1em;
}

.pepperoni {
  background-color: red;
}
```

```jsx title=Pizza.jsx
import styles from "./Pizza.module.css";

export default function Pizza({ name, ingredients }) {
  return (
    <li className={`${styles.pizza} ${styles.pepperoni}`}>
      <h1>{name}</h1>
      <h2>{ingredients}</h2>
    </li>
  );
}
```

### Set a classname as global in modules

```css title=Pizza.module.css
:global(.pizza) {
  border: 1px solid black;
  padding: 1em;
}
```
