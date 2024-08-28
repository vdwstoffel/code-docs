---
sidebar_label: "React Old"
sidebar_position: 999
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# React Old



## useContext

`useContext` is a React hook that allows components to access shared data or values from a parent component's context without the need for prop drilling.

```jsx title="/context/auth-context.jsx"
import { createContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {}, // placeholder functions
  logout: () => {}, // placeholder functions
});

export function AuthContextProvider(props) {
  const [isAuth, setIsAuth] = useState(false);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isAuth, login: login, logout: logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// Export the auth context
export default AuthContext;
```

```jsx title="App.jsx"
import { useContext } from "react";
import AuthContext from "./context/auth-context";

export default function App() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Logged In: {isLoggedIn ? "Yes" : "No"} </h1>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

```jsx title="main.jsx"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/auth-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap app in the context provider */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
```

## Router

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

### useNavigate

```jsx title="Home.jsx"
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/products"); // programmatically go to another page
  };

  return (
    <div>
      <h1>Welcome Home</h1>
      <button onClick={clickHandler}>Go To Products</button>
    </div>
  );
}
```

### Link

```jsx
import { Link } from "react-router-dom";

export default function Page() {
  return <Link to="/toPage">To Page</Link>;
}
```

### Navlink

```jsx
import { NavLink } from "react-router-dom";

export default function App() {
  return <Navlink to="/">Home</Navlink>;
}
```

### useLoaderData

Load the data before the page loads and pass the data to the page

```jsx title="App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Content, { loader as eventLoader } from "./Content"; // import the loader function

const router = createBrowserRouter([
  { path: "/", element: <Content />, loader: eventLoader }, // call the loader function before the page loads
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

```jsx title="Content.jsx"
import { useLoaderData } from "react-router-dom";

export default function Content() {
  const data = useLoaderData(); // Gain access to the data from the api call

  return <h1>{data.name}</h1>;
}

/*
 * Loader function, declare as a export function with the component it will use
 * and export it to the routes
 */
export async function loader() {
  const response = await fetch("https://swapi.dev/api/people/1/");
  return await response;
}
```

### useLoaderData Dynamic Routing

```jsx title="Content.jsx"
import { useLoaderData } from "react-router-dom";

export default function Content() {
  const data = useLoaderData(); // Gain access to the data from the api call

  return <h1>{data.name}</h1>;
}

/*
 * Loader function, declare as a export function with the component it will use
 * and export it to the routes
 */
export async function loader({ request, params }) {
  const num = params.number; // should match the dynamic param from the path ex.  path: "/:number"
  const response = await fetch(`https://swapi.dev/api/people/${num}/`);
  return await response;
}
```

```jsx title="App.jsx"
import "./global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Content, { loader as eventLoader } from "./Content"; // import the loader function

const router = createBrowserRouter([
  { path: "/:number", element: <Content />, loader: eventLoader }, // call the loader function before the page loads
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

### useRouterError

Create a custom error component and send error to it. Whenever an error occurs react will find the closest errorElement

```jsx title="App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Content, { loader as eventLoader } from "./Content"; // import the loader function
import Error from "./Error";

const router = createBrowserRouter([
  {
    path: "/content",
    element: <Content />,
    loader: eventLoader,
    errorElement: <Error />,
  }, //add default error handler
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

```jsx title="Content.jsx"
import { useLoaderData, json } from "react-router-dom";

export default function Content() {
  const data = useLoaderData(); // Gain access to the data from the api call

  return <h1>{data.name}</h1>;
}

/*
 * Loader function, declare as a export function with the component it will use
 * and export it to the routes
 */
export async function loader() {
  const response = await fetch("https://swapi.dev/api/wrong_peope/1/"); // notice wrong api url
  if (!response.ok) {
    throw json({ message: "Could not fetch data" }, { status: 400 }); // creates a response object
  } // will direct to the error page
  return await response;
}
```

```jsx title="Error.jsx"
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError(); // gain access to thew error object

  return (
    <>
      <h1>{error.status}</h1>
      <h2>{error.data.message}</h2>
    </>
  );
}
```

### useSearchParam

The useSearchParams hook is used in React Router to access and manage the query parameters of the current URL, allowing components to read and update the search parameters in the browser's address bar.

```jsx title="App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Content from "./Content";

const router = createBrowserRouter([{ path: "/content", element: <Content /> }]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

```jsx title="Content.jsx"
import { useSearchParams } from "react-router-dom";

export default function Products() {
  // get everything in the params ex localhost/products?bread
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <h1>{searchParams}</h1>
    </div>
  );
}
```

### userRouterLoaderData

This hook makes the data at any currently rendered route available anywhere in the tree

```jsx title="App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // npm i react-router-dom

import User from "./User";
import { getUsername } from "./getUsername"; // custom function

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
    loader: getUsername, // loader function to share data with other components
    id: "root", // set a id to refer to the data
    children: [{ index: true, element: <User /> }],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

```jsx title="User.jsx"
import { useRouteLoaderData } from "react-router-dom";

export default function User() {
  const user = useRouteLoaderData("root"); // id set in the app route definition

  return <h1>Hello: {user}</h1>;
}
```

```jsx title="getUsername.js"
export function getUsername() {
  return "Stoffel";
}
```

### Router Forms

```mdx-code-block
<Tabs>
<TabItem value="Component">
```

```jsx title="UserForm.jsx"
import { Form, redirect } from "react-router-dom";

export default function UserForm() {
  return (
    <Form method="POST">
      <h1>Hello</h1>
      <label>Name</label>
      <input type="text" id="name" name="name" />
      {/* name will be used to identify in the action*/}
      <button>Submit</button>
    </Form>
  );
}

// action function to capture event data
export async function action({ request, params }) {
  const data = await request.formData();
  const userData = {
    username: data.get("name"), //the name attr from the input
  };

  console.log(userData);
  // post request with data

  return redirect("/"); //redirect to any defined route
}
```

```mdx-code-block
</TabItem>
<TabItem value="App">
```

```jsx title="App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // npm i react-router-dom

import UserForm, { action as submitAction } from "./UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserForm />,
    action: submitAction, // action to be performed upon submit click
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

### Delete Request

```jsx title="App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // npm i react-router-dom

import UserForm, { action as submitAction } from "./UserForm";

const router = createBrowserRouter([
  {
    path: "/:event",
    element: <UserForm />,
    action: submitAction, // action to be performed upon submit click
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

```jsx title="UserForm.jsx"
import { redirect, useSubmit } from "react-router-dom";

export default function UserForm() {
  const submit = useSubmit();

  const deleteHandler = () => {
    submit(null, { method: "delete" }); // define the method to be used
  };

  return (
    <>
      <button onClick={deleteHandler}>Delete</button> {/* Not part of the form */}
    </>
  );
}

// action function to capture event data
export async function action({ request, params }) {
  const data = await params.event; // should match the dynamic param in App ex path: "/:event"
  console.log(request.method); // get access to the method
  // post request with data

  return redirect("/event"); //redirect to any defiend route
}
```

## Authentication

## Forms

```jsx title="App.jsx"
import { useState } from "react";

import useFormInput from "./useFormInput";

export default function App() {
  const [username, handleUsernameSubmit, usernameReset] = useFormInput(); // Custom hook to manage form input
  const [email, handleEmailSubmit, emailReset] = useFormInput();

  const [name, setName] = useState(""); // useState hook to manage state
  const [mail, setMail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName(username); // set the state to the form value
    setMail(email);
    usernameReset(); // reset values
    emailReset();

    // API call
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Hello {name}</h1>
      <h1>Email {mail}</h1>
      <label>Name:</label>
      <input value={username || ""} onChange={handleUsernameSubmit} />
      <label>Email:</label>
      <input value={email || ""} onChange={handleEmailSubmit} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

```jsx title="useFormInput.jsx"
import { useState } from "react";

export default function useFormInput(initialValue) {
  // Custom hook to manage form input
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return [value, handleChange, reset];
}
```

### Frontend Form Validation

```jsx title="App.jsx"
import { useState } from "react";
import style from "./App.module.css";

export default function App() {
  const [name, setName] = useState(""); // State for the name form input
  const nameIsValid = name.length > 0; // Check is name meets the requirement

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      console.log("Name is Empty");
      // do something is form is bad
      return;
    }
    // do something is form is good
    window.location.href = "https://google.com";
  };

  const updateInput = (e) => {
    setName(e.target.value);
  };

  return (
    <form>
      <h1>Hello</h1>
      <label>Name:</label>
      <input value={name} onChange={updateInput} className={!nameIsValid ? style.error : null} />
      {!nameIsValid && <p>Name is required</p>}
      <button type="submit" onClick={submitHandler}>
        Submit
      </button>
    </form>
  );
}
```

```css title="App.module.css"
.error {
  border-color: red;
}
```

## Passing Data to Parent Prop

```jsx title="App.jsx"
import { useState } from "react";

import Names from "./Names";

export default function App() {
  const [names, setNames] = useState([]);

  const addName = (name) => {
    setNames([...names, name]);
  };

  return (
    <div>
      <h1>List of Names</h1>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <Names addNameFunction={addName} />
    </div>
  );
}
```

```jsx title="Names.jsx"
import { useState } from "react";

export default function Names(props) {
  const { addNameFunction } = props;
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from refreshing
    addNameFunction(username); // Call the parent function
    setUsername(""); // Empty the input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Portals

```jsx title="App.jsx"
import ReactDOM from "react-dom";

/*
By creating a id in the .html you can move the portal to that id instead of the root
This can move it to the top to make semantics better
*/

export default function App() {
  // Pass the element and the id as arguments
  return ReactDOM.createPortal(
    <h1>This is a Portal at the top of the DOM</h1>,
    document.getElementById("portalExample")
  );
}
```

```html title="index.html"
<body>
  <div id="portalExample"></div>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

## React Redux

```bash
npm i @reduxjs/toolkit
npm i react-redux
```

```
├── App.jsx
├── main.jsx
└── store
  ├── counterSlice.jsx
  └── store.jsx
```

```mdx-code-block
<Tabs>
<TabItem value="main.js">
```

```jsx title="main.jsx"
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // npm i react-redux

import App from "./App";
import store from "./store/store"; // import the redux store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // assign the store value
  <Provider store={store}>
    <App />
  </Provider>
);
```

```mdx-code-block
</TabItem>
<TabItem value="App.jsx">
```

```jsx title="App.jsx"
import { useSelector, useDispatch } from "react-redux";
import { counterAction } from "./store/counterSlice";

export default function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counterSlicer.counter); // state.configureStoreExport.stateItem
  const showCounter = useSelector((state) => state.counterSlicer.showCounter);

  const increaseHandler = () => {
    dispatch(counterAction.increment());
  };

  const decreaseHandler = () => {
    dispatch(counterAction.decrement({ amount: 2 })); // specify a payload by name
  };

  const toggleCounter = () => {
    dispatch(counterAction.toggleCounter(!showCounter));
  };

  return (
    <div>
      <h1>Redux Example</h1>
      {showCounter ? <h2>Counter : {counter} </h2> : null}
      <button onClick={increaseHandler}>Increase</button>
      <button onClick={decreaseHandler}>Decrease</button>
      <button onClick={toggleCounter}>Toggle Show</button>
    </div>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="/store/counterslice.jsx">
```

```jsx title="/store/counterslice.jsx"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: "counterSlice", // identifying alias
  initialState: initialState,
  // Set reducer actions
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state, action) {
      // passing a payload. will be dispatched as .func({amount: 2})
      state.counter = state.counter - action.payload.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterAction = counterSlice.actions; // export to component
export default counterSlice; // export to store
```

```mdx-code-block
</TabItem>
<TabItem value="/store/store.jsx">
```

```jsx title="/store/store.jsx"
import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./counterSlice";

const store = configureStore({
  reducer: { counterSlicer: counterSlice.reducer },
});

export default store; // will be imported in main as a Wrapper for the app

/*
 * When you have multiple stores add it to the configure store's reducer in key/value pairs ex.
 *   const store = configureStore({
 *       reducer: { counterSlicer: counterSlice.reducer, auth: authSlice.reducer },
 *   });
 */
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Scoping CSS

```jsx title="App.jsx"
import { useState } from "react";

// Name the .css file as a module and import as styles
import styles from "./App.module.css";

export default function App() {
  const [clicked, setClicked] = useState(false);

  const clickHandler = () => {
    setClicked(!clicked);
  };

  /*
  Call the class name from the styles module
  Dynamically add the class 'dynamic-bg' based on weather or not the state is clicked
  */
  return (
    <div>
      <h1 className={styles.heading} onClick={clickHandler}>
        Css Modules Example
      </h1>
      <div className={clicked && styles["dynamic-bg"]} onClick={clickHandler}>
        Click Me
      </div>
      <h2 className={`${styles.heading} ${clicked && styles["dynamic-bg"]}`}>Combined</h2>
    </div>
  );
}
```

```css title="App.module.css"
.heading {
  color: Black;
  font-size: 4em;
}

.heading:hover {
  color: red;
}

.dynamic-bg {
  background-color: yellowgreen;
}

/* Media queries works the same way */
@media (max-width: 1000px) {
  .dynamic-bg {
    background-color: red;
  }
}
```


## Various

### Timeout on input changes

```jsx
useEffect(() => {
  /*
  Instead of checking each button press, check after 1 sec of inactivity
  If another button is pressed the current timer will reset 
  */
  const currentTimer = setTimeout(() => {
    setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 6);
  }, 1000);
});
```

### Show current link page

```jsx
<NavLink
    to="/"
    className={({ isActive }) => (isActive ? style.active : undefined)} // className takes an function
    end // Match only exact path name
>
```

## Testing

```jsx title="App.test.js"
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App"; // import the component

/*
 * Create a suite using the global describe function, and add
 * all relevant tests underneath it.
 *
 * render component
 * get element
 * assert the element is correct
 */

describe("App component", () => {
  test("should render 'Basic testing' paragraph", () => {
    render(<App />);
    const heading = screen.getByText("basic test", { exact: false });
    expect(heading).toBeInTheDocument();
  });

  test("should change text when button is clicked", () => {
    render(<App />);
    // Check that text is present
    const preClickText = screen.getByText("State Unchanged", { exact: false });
    expect(preClickText).toBeInTheDocument();

    // Click the button
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Check that text is changed
    const postClickText = screen.getByText("State Changed", { exact: false });
    expect(postClickText).toBeInTheDocument();

    // make sure original text is not present
    // when text is not present use queryByText to return null if nothing found
    const originalText = screen.queryByText("State Unchanged", {
      exact: false,
    });
    expect(originalText).not.toBeInTheDocument();
  });
});
```

```bash
npm test
```

### Async Code

```jsx title="App.test.js"
import { render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";

describe("Async component", () => {
  test("renders post", async () => {
    // replace axios with a mock function
    axios.get = jest.fn();
    // data should mock to original data
    axios.get.mockResolvedValueOnce({
      data: [{ id: "p1", title: "Mock Post" }],
    });

    render(<App />);
    const listItemElements = await screen.findAllByRole("listitem", { exact: false }, { timeout: 1000 });
    expect(listItemElements).not.toHaveLength(0);
  });
});
```

To use axios add to package.json

```json title="package.json"
"jest": {
    "moduleNameMapper": {
      "axios": "axios/dist/node/axios.cjs"
    }
  },
```

### Vite

Vite requires some modification [see here](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb)

- Install the dependancies

```bash
npm i vitest jsdom @testing-library/react @testing-library/jest-dom
```

- In your package.json file, add the following line under the scripts attribute:

package.json

```json
"scripts": {
 "test": "vitest"
}
```

- Create a setup tests file

```jsx title="path/setup.ts"
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

- Configure vite.config.js to use this setup

```jsx title="vite.config.js"
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    testMatch: ['./tests/**/*.test.tsx'],
    globals: true
  }
```

- Your first test

note this should be a .tsx file

```jsx
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  it("renders headline", () => {
    render(<App />);
    const headline = screen.getByText(/It works and you found me!/i);
    expect(headline).toBeInTheDocument();
  });
});
```

## Extensions

[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

[Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related)
