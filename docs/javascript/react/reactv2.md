---
sidebar_label: React V2
---

# React V2

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Getting Started

```mdx-code-block
<Tabs>
<TabItem value="Vite">
```

```bash
npm create vite@latest
cd my-app
npm run dev
```

```mdx-code-block
</TabItem>
<TabItem value="Create React App">
```

```bash
npx create-react-app my-app
cd my-app
npm start
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Components

```jsx
import React from "react";

export default function MyComponent() {
  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}
```

### Importing Components

```jsx
import Pizza from "./Pizza";

export default function App() {
  return (
    <>
      <Pizza />
    </>
  );
}
```

### Passing Props

```mdx-code-block
<Tabs>
<TabItem value="App.jsx">
```

```jsx
export default function App() {
  return (
    <>
      <Pizza name={"Focaccia"} ingredients={"Bread with italian olive oil and rosemary"} />
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Pizza.jsx">
```

```jsx
export default function Pizza(props) {
  const { name, ingredients } = props;
  return (
    <>
      <h1>{name}</h1>
      <h2>{ingredients}</h2>
    </>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## JS

### Iteration

```jsx
// pizzaData...

export default function Menu() {
  return (
    <>
      {pizzaData.map((el, idx) => {
        return <Pizza key={idx} name={el.name} ingredients={el.ingredients} />;
      })}
    </>
  );
}
```

### Conditionals

```jsx
export default function Footer() {
  const isOpen = true;

  return <footer>{isOpen ? "We are open" : "Closed"}</footer>;
}
```

#### Conditionally adding a class

```jsx
export default function Pizza(props) {
  const { soldOut } = props.data;
  return (
    <li className={`pizza ${soldOut ? "sold-out" : null}`}>
      // other code
    </li>
  );
}
```

## Hooks

### useState

`useState` is a Hook in React that lets you add state to your functional components.

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((c) => c + 1); // it’s common to name the pending state argument for the first letter of the state variable name
  }

  return <button onClick={handleClick}>You pressed me {count} times</button>;
}
```

### useEffect

`useEffect` is a Hook in React that allows you to perform side effects in function components. Side effects could be data fetching, subscriptions, or manually changing the DOM, among other things.

```jsx
import { useEffect, useState } from "react";

export default function MyComponent() {
  const [advice, setAdvice] = useState("");

  const getAdvice = async () => {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
  };

  useEffect(function () {
    getAdvice();
  }, []); // dependency array

  return (
    <>
      <h1>Advice: {advice}</h1>
      <button onClick={getAdvice}>Get Advice</button>
    </>
  );
}
```

## Fragments

React Fragments let you group a list of children without adding extra nodes to the DOM.

```jsx
import { Fragment } from "react";

export default function Example() {
  return (
    <Fragment>
      <ChildA />
      <ChildB />
    </Fragment>
  );
}
```

## Styling Apps

```mdx-code-block
<Tabs>
<TabItem value="Scoped CSS">
```

CODE SNIPPET

```mdx-code-block
</TabItem>
<TabItem value="Global CSS">
```

```jsx
import "./index.css";

export default function App() {
  return (
    <div className="container">
      <Header />
    </div>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Inline CSS">
```

```jsx
export default function Header() {
  return <h1 style={{ color: "red", width: "3px"; }}>Fast React Pizza co.</h1>;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```
