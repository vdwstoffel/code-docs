---
sidebar_label: "Examples"
sidebar_position: 1
---

# Examples

## Connecting Express + React (vite)

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

## Vite: Change Default Port

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

### Passing arguments

```jsx
export default function Example() {
  const handleClick = (message) => {
    alert(message);
  };

  return <button onClick={() => handleClick("Hello, world!")}>Click me</button>;
}
```

## Change Page Title

```jsx
document.title = "New Page";
```

## aborting an API request

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
