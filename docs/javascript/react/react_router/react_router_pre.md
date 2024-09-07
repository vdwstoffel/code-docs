---
Sidebar_label: "React Router pre(6.4)"
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import BrowserWindow from "@site/src/components/BrowserWindow/BrowserWindow"

# React Router (pre 6.4)

```bash
npm i react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <NavLink to="/home">Home</NavLink>;
}
```

:::info
Link can also be used instead of `NavLink` to navigate to a different page.

```jsx
import { Link } from "react-router-dom";

<Link to="/home">Home</Link>;
```

:::

## Adding a router

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
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="*" element={<PageNotFound />} />
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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
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

## Adding Nested Routes

[Full Code](https://github.com/vdwstoffel/code_examples/tree/main/javascript/react/react_router_old_nested_routes_ts/src)

```mdx-code-block
<Tabs>
<TabItem value="App.tsx">
```

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Sub1 from "./components/Sub1";
import Sub2 from "./components/Sub2";

export default function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />}>
            <Route index element={<Sub1 />} /> {/* Display Sub1 as default */}
            <Route path="sub" element={<Sub1 />} />
            <Route path="sub2" element={<Sub2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Home.tsx">
```

```tsx
import { Link, Outlet } from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <>
      <h1>Home</h1>
      <Link to="sub">Sub 1</Link>
      <Link to="sub2">Sub 2</Link>
      <Outlet /> {/* Display child element from the route */}
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Sub1.tsx">
```

```tsx
export default function Sub1(): JSX.Element {
  return <h1>Section 1</h1>;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

<BrowserWindow url="localhost/home/sub1">
<h1>Home</h1>
<a>Sub 1 </a>
<a>Sub 2</a>
<h1>Section 1</h1>
</BrowserWindow>

<BrowserWindow url="localhost/home/sub2">
<h1>Home</h1>
<a>Sub 1 </a>
<a>Sub 2</a>
<h1>Section 2</h1>
</BrowserWindow>

## How to get the dynamic route parameter

```mdx-code-block
<Tabs>
<TabItem value="App.jsx">
```

```jsx title="App.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./pages/Product";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product" element={<Home />} />
        //highlight-next-line
        <Route path="product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Product.jsx">
```

```jsx title="Product.jsx"
//highlight-next-line
import { useParams } from "react-router-dom";

export default function Product() {
  //highlight-next-line
  const { id } = useParams();
  return <h1>Product: {id}</h1>;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

<BrowserWindow url="http://localhost/product/123">
<h1>Product: 123</h1>
</BrowserWindow>

## How to get the query parameter from the url

```jsx
import { useSearchParams } from "react-router-dom";

export default function Product() {
  const [searchParams] = useSearchParams();
  return <h1>Product: {searchParams.get("name")}</h1>;
}
```

<BrowserWindow url="http://localhost/product?name=Table">
<h1>Product: Table</h1>
</BrowserWindow>

## How to navigate programmatically

`useNavigate` is a hook that returns a navigate function. Use it to navigate programmatically.

```jsx title="ProductItems.jsx"
import { useNavigate } from "react-router-dom";

export default function ProductItems() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Product</h1>
      <button onClick={() => navigate("/products")}>Go to Products</button>
    </>
  );
}
```

## Navigate away after a certain time

```jsx
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/login-screen");
    }
  }, [userIsInactive]);
}
```

## Redirect back to previous page

`useNavigate` can be used to navigate back to the previous page. Pass `-x` to navigate back `x` number of pages. of `x` to move foreware `x` number of pages.

```jsx
import { useNavigate } from "react-router-dom";

export default function ProductItems() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Product</h1>
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
}
```
