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
