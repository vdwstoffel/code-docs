---
sidebar_label: React V2
---

# React V2

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Create a new React App

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

### Creating a new component

```jsx title="MyComponent.jsx"
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

### Passing Props to child components

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

### Lifting State Up

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

### Validate props with PropTypes

```jsx
import PropTypes from "prop-types";

StarRating.propTypes = {
  maxRating: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default function StarRating({ maxRating, color }) {
  // ....
}
```

### Iterating over an array of data

```jsx
import React from "react";

const pizzaData = [
  { name: "Margherita", ingredients: "Tomato, mozzarella, basil" },
  { name: "Pepperoni", ingredients: "Tomato, mozzarella, pepperoni" },
  { name: "Hawaiian", ingredients: "Tomato, mozzarella, ham, pineapple" },
];

export default function Menu() {
  return (
    <ul>
      {pizzaData.map((pizza, index) => (
        <li key={index}>
          <h2>{pizza.name}</h2>
          <p>{pizza.ingredients}</p>
        </li>
      ))}
    </ul>
  );
}
```

### Conditional Rendering

```mdx-code-block
<Tabs>
<TabItem value="Ternary Operator">
```

```jsx
export default function Pizza({ name, ingredients }) {
  return (
    <>
      <h1>{name}</h1>
      <h2>{ingredients}</h2>
      {ingredients.includes("pepperoni") ? <p>Contains pepperoni</p> : <p>No pepperoni</p>}
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Short-circuit evaluation">
```

```jsx
export default function Pizza({ name, ingredients }) {
  return (
    <>
      <h1>{name}</h1>
      <h2>{ingredients}</h2>
      {ingredients.includes("pepperoni") && <p>Contains pepperoni</p>}
    </>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Fragments

React Fragments let you group a list of children without adding extra nodes to the DOM.

```jsx
export default function Example() {
  return (
    <>
      <ChildA />
      <ChildB />
    </>
  );
}
```

## Hooks

### useState - Add state to functional components

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

### useEffect - Side effects in functional components

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

  useEffect(() => {
    getAdvice();
  }, []); // dependency array. [] will only run on mount
  //                   [variableThatTriggersChange]

  return (
    <>
      <h1>Advice: {advice}</h1>
      <button onClick={getAdvice}>Get Advice</button>
    </>
  );
}
```

### Add a Cleanup Function to useEffect

The cleanup function in the `useEffect` hook is a function that you can return from your effect function. It's used to clean up any resources that your effect has used. Here's a simplified example:

```jsx
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    // Here's the cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return <div>Elapsed time: {seconds} seconds</div>;
}

export default Timer;
```

In this example, the `useEffect` hook starts a timer when the `Timer` component mounts. The interval ID returned by `setInterval` is saved so it can be used to clear the interval when the component unmounts. This is done in the cleanup function, which is the function that's returned from the effect function. This ensures that the timer is stopped and doesn't continue to run after the `Timer` component has been removed from the DOM.

## Forms

### Handling Form Submissions

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



## Styling Apps

### Adding a global stylesheet

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

### Inline Styles

```jsx
export default function Header() {
  return <h1 style={{ color: "red", width: "3px"; }}>Fast React Pizza co.</h1>;
}
```

### Conditional classes

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
