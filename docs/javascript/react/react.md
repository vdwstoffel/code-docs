---
sidebar_label: React
sidebar_position: 3
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import SelectDomElement from '@site/src/components/reactExamples/SelectDomElement'
import UpdateDomElements from '@site/src/components/reactExamples/UpdateDomElements'
import CounterHookExample from '@site/src/components/reactExamples/CounterHookExample'
import ToggleHookExample from '@site/src/components/reactExamples/ToggleHookExample'

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

## React/Redux

### How to setup a store

```bash
npm install @reduxjs/toolkit react-redux
```

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

## Adding a map to your app with leaflet

[Official Docs](https://react-leaflet.js.org/)

```bash
npm i react-leaflet leaflet
npm install -D @types/leaflet
```

```mdx-code-block
<Tabs>
<TabItem value="main.jsx">
```

```jsx title="main.jsx"
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
//highlight-next-line
import "./global.css"

createRoot(document.getElementById('root')!).render(
    <App />
)
```

```mdx-code-block
</TabItem>
<TabItem value="global.css">
```

```css title="global.css"
@import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
```

```mdx-code-block
</TabItem>
<TabItem value="App.tsx">
```

```jsx title="App.tsx"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function App() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Update the center of the map

Each time you click on a button that changes the poition of the map, the map will recenter to the new position.

```jsx
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

export default function Map() {
  const [position, setPosition] = useState([51, 3]);
  return (
    <>
      <div>
        <button onClick={() => setPosition([51, 9])}>Pos 1</button>
        <button onClick={() => setPosition([46, 18])}>Pos 2</button>
      </div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        //highlight-next-line
        <ChangeCenter position={position} />
      </MapContainer>
    </>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
```

### Add a click event to the map

```jsx 
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

export default function Map() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      //highlight-next-line
      <ClickEvent />
    </MapContainer>
  );
}

function ClickEvent() {
  useMapEvents({
    click: (e) => {
      console.log(e.latlng);
    },
  });
  return null;
}
```
