---
sidebar_label: React Router
sidebar_position: 4
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# React Router

React Router is a collection of navigational components that compose declaratively with your application. Whether you want to have bookmarkable URLs for your web app or a composable way to navigate in React Native, React Router works wherever React is rendering.

```bash
npm i react-router-dom
```

## Adding a router (Legacy)

[Full code example](https://github.com/vdwstoffel/code_examples/tree/main/javascript/react/react_router_old_ts)

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```bash
.
├── App.jsx
├── main.jsx
└── pages
    ├── Home.jsx
    ├── PageNotFound.jsx
    └── Product.jsx
```

```mdx-code-block
<Tabs>
<TabItem value="App.jsx">
```

```jsx title=App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./pages/Product";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Home.jsx">
```

```jsx title=Home.jsx
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/product">Product</NavLink>
      <h1>Home</h1>
    </div>
  );
}
```

:::info
`NavLink` adds a class `active` to the link when the link is active.

```html
<a aria-current="page" class="active" href="/">Home</a>
<a class="" href="/product">Product</a>
```

:::

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```bash
.
├── src
│   ├── App.tsx
│   ├── main.tsx
│   ├── pages
│   │   ├── About.tsx
│   │   ├── ErrorPage.tsx
│   │   ├── Home.tsx
│   │   ├── Navbar.module.css
│   │   └── Navbar.tsx
```

```mdx-code-block
<Tabs>
<TabItem value="App.tsx">
```

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";

export default function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="NavBar.tsx">
```

```tsx
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

export default function Navbar(): JSX.Element {
  return (
    <div className={styles.navbar}>
      <NavLink to="/">home</NavLink>
      <NavLink to="/about">about</NavLink>
    </div>
  );
}
```

:::info
`NavLink` adds a class `active` to the link when the link is active.

```html
<a class="active" href="/" aria-current="page">home</a>
<a class="" href="/about">about</a>
```

:::

```mdx-code-block
</TabItem>
<TabItem value="NavBar.module.css">
```

```css
.navbar {
  display: flex;
  justify-content: space-evenly;
}

.navbar a {
  text-decoration: none;
}

:global(.active) {
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  background-color: rgb(7, 7, 7);
}
```

```mdx-code-block
</TabItem>
<TabItem value="Home.tsx">
```

```tsx
export default function Home(): JSX.Element {
  return (
    <>
      <h1>Home</h1>
    </>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Adding a router

```mdx-code-block
<Tabs>
<TabItem value="Header.jsx">
```

```jsx title="Header.jsx"
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="Products">Products</Link>
    </header>
  );
}
```

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
