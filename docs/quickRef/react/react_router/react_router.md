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

## How to quickly get started

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home";
import Menu from "./Menu";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/menu", element: <Menu /> },
]);

export default function App() {
  return (
    <RouterProvider router={router}>
      <h1>Hello Vite</h1>
    </RouterProvider>
  );
}
```

## Building an App layout

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

## Adding an Error Boundary Page

```mdx-code-block
<Tabs>
<TabItem value="Error Page">
```

```jsx title="Error.jsx"
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.status}</i>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="App.jsx">
```

```jsx title="App.jsx"
/* previous imports */
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);
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

## How to get the query parameter from the url

```jsx
import { useSearchParams } from "react-router-dom";

export default function Product() {
  const [searchParams] = useSearchParams();
  const productName = searchParams.get("name");
  return <h1>Product: {productName}</h1>;
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

## Fetch data while navigating using loader

useLoader fetches data as the components loads as opposed to useEffect the loads data after the component is rendered.

```mdx-code-block
<Tabs>
<TabItem value="Menu">
```

In Menu create a loader function that will be called when the component is loaded on the menu route. `useLoaderData` will then be used to get access to the data fetched in the loader function.

```jsx title="Menu.jsx"
//highlight-next-line
import { useLoaderData } from "react-router-dom";

export default function Menu() {
  //highlight-next-line
  const menu = useLoaderData();
  return <h1>{menu}</h1>;
}

// highlight-next-line
export async function loader() {
  // highlight-next-line
  const menu = await someMenuApiService();
  // highlight-next-line
  return menu;
  // highlight-next-line
}
```

```mdx-code-block
</TabItem>
<TabItem value="App">
```

Import the Menu component and the loader function in the App component. Pass the loader function to the Menu component.

```jsx title="App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Home";
//highlight-next-line
import Menu, { loader as menuLoader } from "./Menu";
import AppLayout from "./AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      //highlight-next-line
      { path: "/menu", element: <Menu />, loader: menuLoader },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## How to get the url path in a loader

Since `useParams` is only available in a component you can use `params` from the loader function to get the current url param

- To get the current url path

```jsx
export async function loader({ params }) {
  console.log(params);
}
```

```jsx
const router = createBrowserRouter([
  { path: "/order", element: <Order />, loader: orderLoader },
]);
```

- To get dynamic route params

```jsx
export async function loader({ params }) {
  console.log(params.orderId);
}
```

```jsx
const router = createBrowserRouter([
  { path: "/order/:orderId", element: <Order />, loader: orderLoader },
]);
```

## Add global check to see if a page is loading

useNavigation returns the current loading state of the global navigation.

```jsx
import { Outlet, useNavigation } from "react-router-dom";

import Loader from "./Loader";

export default function AppLayout() {
  //highlight-start
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  //highlight-end
  return (
    <>
      {isLoading && <Loader />}
      <Outlet />
    </>
  );
}
```
