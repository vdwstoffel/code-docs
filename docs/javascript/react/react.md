---
sidebar_label: React
sidebar_position: 3
---

# React

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import SelectDomElement from '@site/src/components/reactExamples/SelectDomElement'
import UpdateDomElements from '@site/src/components/reactExamples/UpdateDomElements'
import CounterHookExample from '@site/src/components/reactExamples/CounterHookExample'
import ToggleHookExample from '@site/src/components/reactExamples/ToggleHookExample'

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

### useState

`useState` is a Hook in React that lets you add state to your functional components.

#### Add state to functional components

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

#### Update state based on the prev state

```jsx
const [count, setCount] = useState(0);

function increment() {
  setCount((prevCount) => prevCount + 1);
}
```

#### Initialize state with a function

Lazy initialization in React is a pattern where you pass a function to the useState hook. This function will run only once when the component mounts and its return value will be the initial state. This is useful when the initial state is expensive to compute and you want to avoid computing it on every render.

```jsx
const [count, setCount] = useState(() => {
  const initialCount = 0;
  return initialCount;
});
```

### useEffect

`useEffect` is a Hook in React that allows you to perform side effects in function components. Side effects could be data fetching, subscriptions, or manually changing the DOM, among other things.

#### Side effects in functional components

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

#### Add a Cleanup Function

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

### useRef

`useRef` is a Hook in React that allows you to create a mutable object that persists for the lifetime of the component. It's commonly used to reference DOM elements or to store mutable values that don't trigger a re-render when they change.

#### How to select DOM elements

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```jsx
import { useRef } from "react";

export default function MyComponent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```tsx
import { useRef, MouseEvent } from "react";

export default function MyComponent(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

<SelectDomElement/>

#### Update DOM elements

```jsx
import { useRef } from "react";

export default function MyComponent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.value = "Hello";
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Update Input</button>
    </>
  );
}
```

<UpdateDomElements/>

### Custom Hooks

Custom hooks are reusable functions that contain logic that can be shared between components. They are a powerful way to extract and share logic between components in a React application.

#### Counter Example

```jsx
import { useState } from "react";

function useCounter(initialCount = 0) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const decrement = () => {
    setCount((c) => c - 1);
  };

  return { count, increment, decrement };
}

export default useCounter;
```

```jsx
import useCounter from "./useCounter";

export default function Counter() {
  const { count, increment, decrement } = useCounter();

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <span>{count}</span>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

<CounterHookExample/>

#### Toggle Input

```jsx title="/hooks/useToggler.jsx"
import { useState } from "react";

/* By convention prefix class with use */
export default function useToggler(value = false) {
  const [isOn, setIsOn] = useState(value);

  const toggle = () => {
    setIsOn(!isOn);
  };

  return [isOn, toggle]; // return the state and the toggle function
}
```

```jsx title="App.jsx"
import useToggler from "./hooks/useToggler";

export default function App() {
  const [btnOne, setBtnOne] = useToggler(false); // value , toggle function
  const [btnTwo, setBtnTwo] = useToggler(false); // value , toggle function

  return (
    <div>
      <h onClick={setBtnOne}>Button 1 is {btnOne ? "On" : "Off"}</h>
      <br />
      <h onClick={setBtnTwo}>Button 2 is {btnTwo ? "On" : "Off"}</h>
    </div>
  );
}
```

<ToggleHookExample/>

#### Form Input Hooks

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```jsx
import { useState, ChangeEvent } from "react";

export default function useFormInput(initialValue) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [value, handleChange, reset];
}
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```tsx
import { useState, ChangeEvent } from "react";

export default function useFormInput(
  initialValue: string
): [string, (e: ChangeEvent<HTMLInputElement>) => void, () => void] {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = (): void => {
    setValue("");
  };

  return [value, handleChange, reset];
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

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

## React/Redux

```bash
npm install @reduxjs/toolkit react-redux
```

### How to setup a store

```mdx-code-block
<Tabs>
<TabItem value="store.js">
```

```js title="app/store.js"
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

```mdx-code-block
</TabItem>
<TabItem value="index.js">
```

```js title="index.js"
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//highlight-next-line
import store from "./app/store";
//highlight-next-line
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //highlight-next-line
  <Provider store={store}>
    <App />
  </Provider>
);
```

```mdx-code-block
</TabItem>
<TabItem value="counterSlice.js">
```

```js title="counter/counterSlice.js"
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

```mdx-code-block
</TabItem>
<TabItem value="Counter.jsx">
```

```js title='components/Counter.js'
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Authentication

```mdx-code-block
<Tabs>
<TabItem value="authSlice">
```

```js title=store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userDetails: {},
  },
  reducers: {
    authenticateUser: (state, action) => {
      const { userDetails } = action.payload;
      state.isLoggedIn = true;
      state.userDetails = userDetails;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userDetails = {};
    },
  },
});

export const { authenticateUser, logoutUser } = authSlice.actions;

export default authSlice;
```

```mdx-code-block
</TabItem>
<TabItem value="Store">
```

```js title="store/store.js"
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    auth: authReducer.reducer,
  },
});
```

```mdx-code-block
</TabItem>
<TabItem value="authApi.js">
```

Api call to backend to get the user details and update the store with the details

```js title=authApi.js
import authSlice from "./store/authSlice";

export const authenticateUser = () => {
  return async (dispatch) => {
    const res = await getUserDetails(); // call to backend to get user details
    dispatch(authSlice.actions.authenticateUser({ userDetails: res.data }));
  };
};
```

```mdx-code-block
</TabItem>
<TabItem value="App.jsx">
```

Check the dispatch store everytime the app loads

```js title=App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//highlight-next-line
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
//highlight-next-line
import { authenticateUser } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Auth /> },
    ],
  },
]);

export default function App() {
  //highlight-next-line
  const dispatch = useDispatch();

  useEffect(() => {
    //highlight-next-line
    dispatch(authenticateUser());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
```

```mdx-code-block
</TabItem>
<TabItem value="Main.jsx">
```

```js title=Main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
//highlight-next-line
import { Provider } from "react-redux";

import App from "./App.jsx";
//highlight-next-line
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    //highlight-next-line
    <Provider store={store}>
      <App />
      //highlight-next-line
    </Provider>
  </React.StrictMode>
);
```

```mdx-code-block
</TabItem>
<TabItem value="Home.jsx">
```

Check the dispatch store every time Home loads

```js title=Home.jsx
import { useEffect } from "react";
//highlight-next-line
import { useSelector, useDispatch } from "react-redux";
//highlight-next-line
import { authenticateUser } from "../utils/auth";

export default function Home() {
  //highlight-next-line
  const dispatch = useDispatch();
  //highlight-next-line
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //highlight-next-line
  const userDetails = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    //highlight-next-line
    dispatch(authenticateUser());
  }, [dispatch]);

  return <>{isLoggedIn && <... />}</>;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## React Router

### Adding a router

```bash
npm i react-router-dom
```

```jsx title="MainNavigation.jsx"
import { Link } from "react-router-dom";

export default function MainNavigation() {
  return (
    <header>
      <p>
        <Link to="/">Home </Link>
      </p>
      {/* Not home component just a link*/}
      <p>
        <Link to="Products">Products</Link>
      </p>
    </header>
  );
}
```

```jsx title="RootLayout.jsx"
import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

export default function RootLayout() {
  return (
    <>
      <MainNavigation /> {/* Add a navigation header */}
      <Outlet /> {/* Display all child pages */}
    </>
  );
}
```

```jsx title="App.jsx"
import "./global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom"; // npm i react-router-dom

import RootLayout from "./RootLayout";
import Home from "./Home";
import Products from "./Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Wrap the root layout and add other pages as children
    // errorElement: <ErrorPage />, // if page does not exists show a define error page
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <Products /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

```jsx title="Home.jsx"
export default function Home() {
  return <h1>Welcome Home</h1>;
}
```

```jsx title="Products.jsx"
export default function Products() {
  return <h1>This is the Products page</h1>;
}
```

## General

### Connecting Express + React (vite)

```javascript title="vite.config.js"
server: {
    proxy: {
      "/api": {
        target: "http://localhost:<express-port>", // Your Express backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' prefix
      },
    },
  },
```

```javascript title="App.jsx"
const res = await axios.get("api/backend-route");
```

### Vite: Change Default Port

```jsx title="vite.config.js"
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 8000,
    host: true, // needed for docker
  },
});
```

### aborting an API request

```jsx
import React, { useState, useEffect } from "react";

function FetchComponent({ query }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      const response = await fetch(`https://api.example.com/data?query=${query}`, { signal: controller.signal });
      const data = await response.json();
      setData(data);
    };

    fetchData();

    // Cleanup function
    return () => {
      controller.abort(); // This aborts the fetch request
    };
  }, [query]);

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}

export default FetchComponent;
```

### Change Page Title

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "New Title";
  }, []);

  return <div>App</div>;
}
```

## Events

### Handle button click

```jsx
export default function App() {
  const clickHandler = () => {
    alert("Hello");
  };

  return <button onClick={clickHandler}>Press</button>;
}
```

### Passing arguments to event handlers

```jsx
export default function Example() {
  const handleClick = (message) => {
    alert(message);
  };

  return <button onClick={() => handleClick("Hello, world!")}>Click me</button>;
}
```
