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

### Child Props

In React, `props.children` is used to display whatever you include between the opening and closing tags when invoking a component.

```jsx
function Button({ children, clickHandler }) {
  return (
    <button onClick={clickHandler} className="button" type="select">
      {children}
    </button>
  );
}

function App() {
  return <Button clickHandler={() => console.log("Add")}>Add Friend</Button>;
}
```

### React Composition - Passing Data to child component

The App component demonstrates composition by using ParentComponent to wrap ChildComponent. The ChildComponent is passed as a child to ParentComponent, creating a parent-child relationship between the components. This is a powerful feature of React that allows for more flexible and reusable components.

```jsx
import React from "react";

function ParentComponent({ children }) {
  return <div className="parent-component">{children}</div>;
}

function ChildComponent({ message }) {
  return <div className="child-component">{message}</div>;
}

function App() {
  return (
    <ParentComponent>
      <ChildComponent message="Hello" />
    </ParentComponent>
  );
}
```

### PropTypes (Prop Validation)

```jsx
import PropTypes from "prop-types";

StarRating.propTypes = {
    maxRating: PropTypes.number.isRequired,
    color: PropTypes.string
}

export default function StarRating({ maxRating, color }) {
  // ....
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
    setAdvice((a) => data.slip.advice);
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

## Lifting State Up

"Lifting state up" in React refers to the process of moving state from child components up to a common ancestor component. This allows multiple components to share and manipulate the same state, which is often necessary when those components need to stay in sync.

```jsx
import { useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ChildA count={count} />
      <ChildB setCount={setCount} />
    </div>
  );
}

function ChildA({ count }) {
  return <div>Count: {count}</div>;
}

function ChildB({ setCount }) {
  return <button onClick={() => setCount((count) => count + 1)}>Increment</button>;
}
```

## Forms

```jsx
export default function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button>Submit</button>
    </form>
  );
}
```

### Controlled Elements

In React, a "controlled component" is a component where the state within the component is controlled by the React state.

For form elements, this means the form data is handled by a React component's state. The value of the form field is directly linked to the state of the component, and updates to the field are immediately reflected in the state.

```jsx
import { useState } from "react";

export default function ControlledForm() {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    alert("A name was submitted: " + name);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button>Submit</button>
    </form>
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
  return <li className={`pizza ${soldOut ? "sold-out" : null}`}>// other code</li>;
}
```
