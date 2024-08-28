---
sidebar_label: React Router
sidebar_position: 4
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import BrowserWindow from "@site/src/components/BrowserWindow/BrowserWindow"

# React Router

React Router is a collection of navigational components that compose declaratively with your application. Whether you want to have bookmarkable URLs for your web app or a composable way to navigate in React Native, React Router works wherever React is rendering.

```bash
npm i react-router-dom
```

## Adding a router

```mdx-code-block
<Tabs>
<TabItem value="Header.jsx">
```

```jsx title="Header.jsx"
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="Products">Products</NavLink>
    </header>
  );
}
```

:::info
`NavLink` adds a class `active` to the link when the link is active.

```html
<a aria-current="page" class="active" href="/">Home</a>
<a class="" href="/product">Products</a>
```
:::

:::info
Link can also be used instead of `NavLink` to navigate to a different page.

```jsx
import { Link } from "react-router-dom";

<Link to="/home">Home</Link>;
```

:::

```mdx-code-block
</TabItem>
<TabItem value="RootLayout.jsx">
```

```jsx title="RootLayout.jsx"
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RootLayout() {
  return (
    <>
      <Header /> {/* Add a navigation header */}
      <Outlet /> {/* Display all child pages */}
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="App.jsx">
```

```jsx title="App.jsx"
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

```mdx-code-block
</TabItem>
<TabItem value="Home.jsx">
```

```jsx title="Home.jsx"
export default function Home() {
  return <h1>Welcome Home</h1>;
}
```

```mdx-code-block
</TabItem>
<TabItem value="Products.jsx">
```

```jsx title="Products.jsx"
export default function Products() {
  return <h1>This is the Products page</h1>;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## How to get the dynamic route parameter

`useParams` is a hook that returns an object of key/value pairs of URL parameters. Use it to access the dynamic route parameter.

```mdx-code-block
<Tabs>
<TabItem value="App.jsx">
```

```jsx title="App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// imports

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/products", element: <Products /> },
      //highlight-next-line
      { path: "products/:id", element: <ProductItems /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

```mdx-code-block
</TabItem>
<TabItem value="ProductItems.jsx">
```

```jsx title="ProductItems.jsx"
//highlight-next-line
import { useParams } from "react-router-dom";

export default function ProductItems() {
  // highlight-next-line
  const { id } = useParams();
  return <h1>Product: {id}</h1>;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

<BrowserWindow url="https://site.com/products/123">
<h1>Product 123</h1>
</BrowserWindow>
