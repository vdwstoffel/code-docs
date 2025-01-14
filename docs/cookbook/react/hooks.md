---
sidebar_label: "Hooks"
sidebar_position: 2
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import SelectDomElement from '@site/src/components/reactExamples/SelectDomElement'
import UpdateDomElements from '@site/src/components/reactExamples/UpdateDomElements'
import CounterHookExample from '@site/src/components/reactExamples/CounterHookExample'
import ToggleHookExample from '@site/src/components/reactExamples/ToggleHookExample'
import BrowserWindow from '@site/src/components/BrowserWindow/BrowserWindow'
import UseMemoExample from '@site/src/components/reactExamples/UseMemoExample'
import UseCallbackExample from '@site/src/components/reactExamples/UseCallbackExample'
import DivRefExample from '@site/src/components/reactExamples/DivRefExample'

# Hooks

## useState

`useState` is a Hook in React that lets you add state to your functional components.

```jsx
import { useState } from "react";

const [state, setState] = useState(initialState);
```

### Add state to functional components

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

### Update state based on the prev state

```jsx
const [count, setCount] = useState(0);

function increment() {
  setCount((prevCount) => prevCount + 1);
}
```

### Initialize state with a function

Lazy initialization in React is a pattern where you pass a function to the useState hook. This function will run only once when the component mounts and its return value will be the initial state. This is useful when the initial state is expensive to compute and you want to avoid computing it on every render.

```jsx
const [count, setCount] = useState(() => {
  const initialCount = 0;
  return initialCount;
});
```

## useEffect

`useEffect` is a Hook in React that allows you to perform side effects in function components. Side effects could be data fetching, subscriptions, or manually changing the DOM, among other things.

```jsx
import { useEffect } from "react";

useEffect(() => {
  // effect
  return () => {
    // cleanup
  };
}, [dependencies]);
```

### How to fetch external api data

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

### Add a Cleanup Function

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

### Aborting an API request

```jsx
import React, { useState, useEffect } from "react";

function FetchComponent({ query }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      const response = await fetch(
        `https://api.example.com/data?query=${query}`,
        { signal: controller.signal }
      );
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

## useRef

`useRef` is a Hook in React that allows you to create a mutable object that persists for the lifetime of the component. It's commonly used to reference DOM elements or to store mutable values that don't trigger a re-render when they change.

```jsx
import { useRef } from "react";

const ref = useRef(initialValue);
```

### How to select DOM elements

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

```jsx
import { useRef } from "react";

export default function MyComponent(): React.JSX.Element {
  const inputRef = useRef < HTMLInputElement > null;

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

<BrowserWindow>
<SelectDomElement/>
</BrowserWindow>

### Update DOM elements

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

<BrowserWindow>
<UpdateDomElements/>
</BrowserWindow>

### Adding classes to a dif using useRef

```jsx
import { useRef } from "react";

export default function RefExample() {
  const redBox = useRef();

  function handleClick() {
    console.log(redBox);
    redBox.current.className = redBox.current.className + " spin";
    redBox.current.textContent = "Spinning";

    setTimeout(() => {
      redBox.current.textContent = "Stable";
      redBox.current.className = "box red";
    }, 5500);
  }

  return (
    <>
      <h1>UseRef Example</h1>
      <div>
        <button onClick={handleClick}>Red</button>
      </div>
      <div>
        <div ref={redBox} className="box red">
          Stable
        </div>
      </div>
    </>
  );
}
```

<DivRefExample/>

## useReducer

`useReducer` is a Hook in React that allows you to manage complex state logic in your components. It's similar to `useState`, but it's more suitable for managing state that involves multiple sub-values or when the next state depends on the previous one.

Reducer functions takes two arguments: the current state and an action object. The action object typically has a `type` property that describes the action and an optional `payload` property that can contain additional data. The reducer function then returns the new state based on the action type and payload.

```jsx
import { useReducer } from "react";

function reducerFn(state, action) {
  // ...

const [state, dispatch] = useReducer(reducerFn, initialState);
```

### Manage state with useReducer

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```jsx
import { useReducer } from "react";

function reducer(state, action): {
  console.log(state); // 0
  console.log(action); // {type: 'increase', payload: 1}

  switch (action.type) {
    case "increase":
      return state + action.payload;
    case "decrease":
      return state - action.payload;
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [count, dispatch] = useReducer(reducer, 0);

  function increase() {
    dispatch({ type: "increase", payload: 1 });
  }

  function decrease() {
    dispatch({ type: "decrease", payload: 1 });
  }

  return (
    <>
      <button onClick={decrease}>-</button>
      <p>{count}</p>
      <button onClick={increase}>+</button>
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```tsx
import { useReducer } from "react";

function reducer(
  state: number,
  action: { type: string; payload: number }
): number {
  console.log(state); // 0
  console.log(action); // {type: 'increase', payload: 1}

  switch (action.type) {
    case "increase":
      return state + action.payload;
    case "decrease":
      return state - action.payload;
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [count, dispatch] = useReducer(reducer, 0);

  function increase() {
    dispatch({ type: "increase", payload: 1 });
  }

  function decrease() {
    dispatch({ type: "decrease", payload: 1 });
  }

  return (
    <>
      <button onClick={decrease}>-</button>
      <p>{count}</p>
      <button onClick={increase}>+</button>
    </>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Managing multiple state values

[Code](https://replit.com/@vdwstoffel/useReducer-example#src/App.jsx)

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```jsx
import { useReducer } from "react";

const initialState = {
  toDoList: ["Hello", "World"],
  current: "",
};

function reducerFn(state, action) {
  switch (action.type) {
    case "newTodo":
      // return the new state, with the current value updated from the payload
      return { ...state, current: action.payload };
    case "add":
      return {
        ...state,
        toDoList: [...state.toDoList, state.current],
        current: "",
      };
    case "remove":
      const index = state.toDoList.indexOf(action.payload);
      const temp = [...state.toDoList];
      temp.splice(index, 1);
      return { ...state, toDoList: temp };
    default:
      throw new Error("Unknow");
  }
}

export default function App() {
  const [todoData, dispatch] = useReducer(reducerFn, initialState);

  const { toDoList, current } = todoData;

  function getValue(e) {
    dispatch({ type: "newTodo", payload: e.target.value });
  }

  function add() {
    dispatch({ type: "add" });
  }

  function remove(item) {
    dispatch({ type: "remove", payload: item });
  }

  return (
    <div>
      <h1>TODO</h1>
      {toDoList.map((e) => {
        return (
          <div>
            <li key={e}>{e}</li>
            <button onClick={() => remove(e)}>x</button>
          </div>
        );
      })}
      <div>
        <input type="text" onChange={getValue} value={current} />
        <button onClick={add}>Add</button>
      </div>
    </div>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```tsx
import { useReducer, ChangeEvent } from "react";

interface State {
  toDoList: string[];
  current: string;
}

type Action =
  | { type: "newTodo"; payload: string }
  | { type: "add" }
  | { type: "remove"; payload: string };

const initialState: State = {
  toDoList: ["Hello", "World"],
  current: "",
};

function reducerFn(state: State, action: Action): State {
  switch (action.type) {
    case "newTodo":
      return { ...state, current: action.payload };
    case "add":
      return {
        ...state,
        toDoList: [...state.toDoList, state.current],
        current: "",
      };
    case "remove":
      const index = state.toDoList.indexOf(action.payload);
      const temp = [...state.toDoList];
      temp.splice(index, 1);
      return { ...state, toDoList: temp };
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [todoData, dispatch] = useReducer(reducerFn, initialState);

  const { toDoList, current } = todoData;

  function getValue(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "newTodo", payload: e.target.value });
  }

  function add() {
    dispatch({ type: "add" });
  }

  function remove(item: string) {
    dispatch({ type: "remove", payload: item });
  }

  return (
    <div>
      <h1>TODO</h1>
      {toDoList.map((e) => (
        <div key={e}>
          <li>{e}</li>
          <button onClick={() => remove(e)}>x</button>
        </div>
      ))}
      <div>
        <input type="text" onChange={getValue} value={current} />
        <button onClick={add}>Add</button>
      </div>
    </div>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## useContext

`useContext` is a Hook in React that allows you to access global data in your components without having to pass props down through multiple levels of the component tree. The context is available to all child components of the provider.

### Global state management

```bash
.
├── App.tsx
├── context
│   ├── authContext.tsx
├── main.tsx
```

```mdx-code-block
<Tabs>
<TabItem value="authContext.tsx">
```

The `AuthContext` component is a provider that wraps the entire application. It provides the `isLoggedIn`, `login`, `logout`, and `userData` values to all components in the application.

```tsx
import { ReactNode } from "react";
import { createContext, useState, useContext } from "react";

interface Props {
  children: ReactNode;
}

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userData: {},
});

export function AuthContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  function login(): void {
    setUserData({ name: "John" });
    setIsLoggedIn(true);
  }

  function logout(): void {
    setUserData({});
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        userData: userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Create custom hook for the context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth used outside of the Provider");
  }

  return context;
}
```

```mdx-code-block
</TabItem>
<TabItem value="App.tsx">
```

```tsx
//highlight-next-line
import { useContext } from "react";
//highlight-next-line
import { useAuth } from "./context/authContext";

export default function App() {
  //highlight-next-line
  const { isLoggedIn, login, logout, userData } = useAuth();
  return (
    <>
      <div>
        <h1>Logged In: {isLoggedIn ? userData.name : "Not Logged in"} </h1>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="main.tsx">
```

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
//highlight-next-line
import { AuthContextProvider } from "./context/authContext.tsx";

createRoot(document.getElementById("root")!).render(
  //highlight-next-line
  <AuthContextProvider>
    <App />
    // highlight-next-line
  </AuthContextProvider>
);
```

```mdx-code-block
</TabItem>
</Tabs>
```

## useMemo

`useMemo` is a Hook in React that allows you to memoize expensive calculations so that they are only computed when the dependencies change. It's useful for optimizing performance by avoiding unnecessary re-renders.

### Skipper re-render with useMemo

```jsx
import React, { useState, useMemo } from "react";

export default function UseMEmoExmaple() {
  const [times, setTimes] = useState(0);
  const [force, setForce] = useState(false);

  const date = useMemo(() => {
    return new Date().toLocaleTimeString();
  }, [force]);

  return (
    <>
      <p>Times Clicked: {times}</p>
      <button onClick={() => setTimes((t) => t + 1)}>Increase</button>
      <p>Without Memo update: {new Date().toLocaleTimeString()}</p>
      <p>With Memo Update: {date}</p>
      <button onClick={() => setForce((f) => !f)}>Force Rerender</button>
    </>
  );
}
```

<UseMemoExample/>

## useCallback

`useCallback` is a Hook in React that returns a memoized callback function. It's useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary re-renders.

### Memoize functions

```mdx-code-block
<Tabs>
<TabItem value="useMemo">
```

```jsx
import { useState, useCallback, useMemo } from "react";

// Button component that receives a callback
const Button = ({ onClick, text }) => {
  console.log(`${text} button rendered`);
  return <button onClick={onClick}>{text}</button>;
};

export default function App() {
  const [count, setCount] = useState(0);

  // useCallback to prevent the increment function from being re-created on every render
  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  // Using useMemo to memoize the Button components
  const incrementButton = useMemo(() => {
    return <Button onClick={increment} text="Increment" />;
  }, [increment]);

  return (
    <div>
      <h1>Count: {count}</h1>
      {/* Render the memoized buttons */}
      {incrementButton}
    </div>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="React.Memo">
```

```jsx
import React, { useState, useCallback } from "react";

// Child component that receives a callback
const Button = React.memo(({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
});

export default function UseCallbackExample() {
  const [count, setCount] = useState(0);

  // Without useCallback, this function will be re-created on every render
  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []); // Dependency array is empty, so it will only be created once

  return (
    <>
      <div>
        <h1>Count: {count}</h1>
        <Button onClick={increment} text="Increment" />
      </div>
    </>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

<UseCallbackExample/>

## Custom Hooks

Custom hooks are reusable functions that contain logic that can be shared between components. They are a powerful way to extract and share logic between components in a React application.

### Counter Example

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

<BrowserWindow>
<CounterHookExample/>
</BrowserWindow>

### Toggle Input

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

<BrowserWindow>
<ToggleHookExample/>
</BrowserWindow>

### Form Input Hooks

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
