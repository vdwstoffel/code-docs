---
sidebar_label: React
sidebar_position: 0
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import SelectDomElement from '@site/src/components/reactExamples/SelectDomElement'
import UpdateDomElements from '@site/src/components/reactExamples/UpdateDomElements'
import CounterHookExample from '@site/src/components/reactExamples/CounterHookExample'
import ToggleHookExample from '@site/src/components/reactExamples/ToggleHookExample'
import LazyLoadWithSuspense from '@site/src/components/reactExamples/LazyLoadWithSuspense'

import reactLogo from "@site/static/img/react.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

# React

<DisplayLogo logo={reactLogo} />

React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.

[Official Docs](https://reactjs.org/)

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

## React Project Example

```bash
.
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── src
│   ├── App.jsx
│   ├── features
│   │   ├── cart
│   │   │   ├── CartItem.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CartOverview.jsx
│   │   │   └── EmptyCart.jsx
│   │   ├── menu
│   │   │   ├── MenuItem.jsx
│   │   │   └── Menu.jsx
│   │   ├── order
│   │   │   ├── CreateOrder.jsx
│   │   │   ├── OrderItem.jsx
│   │   │   ├── Order.jsx
│   │   │   └── SearchOrder.jsx
│   │   └── user
│   │       ├── CreateUser.jsx
│   │       └── userSlice.js
│   ├── index.css
│   ├── main.jsx
│   ├── services
│   │   ├── apiGeocoding.js
│   │   └── apiRestaurant.js
│   ├── ui
│   │   ├── AppLayout.jsx
│   │   ├── Error.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   └── Loader.jsx
│   └── utils
│       └── helpers.js
└── vite.config.js
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

- Note that your route should start with `/api` in the backend.

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


## Lazy Loading

Lazy loading is a technique to defer loading of non-critical resources at page load time. This can help reduce the initial load time of your app.

### Load components lazily, when needed

```jsx
import { lazy, Suspense } from "react";

import BrowserWindow from "../BrowserWindow/BrowserWindow";

const LazyComponent = lazy(() => import("./LazyComponent"));

export default function LazyLoadWithSuspense() {
  return (
    <BrowserWindow>
      <h1>Normal Component</h1>

      <Suspense fallback={<h1>Loading...</h1>}>
        <LazyComponent />
      </Suspense>
    </BrowserWindow>
  );
}
```
<!-- Break the build process for what ever reason -->
<!-- <LazyLoadWithSuspense/> -->

