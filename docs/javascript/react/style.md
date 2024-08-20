---
sidebar_label: Styling Apps
sidebar_position: 3
---



# Styling Apps

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
    <li className={`pizza ${ingredients.includes("pepperoni") ? "pepperoni" : ""}`}>
      <h1>{name}</h1>
      <h2>{ingredients}</h2>
    </li>
  );
}
```
