---
sidebar-label: "Authentication"
sidebar_position: 6
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Authentication

## How to setup authentication with Redux

```bash
npm install @reduxjs/toolkit react-redux
```

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```mdx-code-block
<Tabs>
<TabItem value="authSlice">
```

```js title=store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userDetails: {},
  },
  reducers: {
    authenticateUser: (state, action) => {
      const { userDetails } = action.payload;
      state.isLoggedIn = true;
      state.userDetails = userDetails;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userDetails = {};
    },
  },
});

export const { authenticateUser, logoutUser } = authSlice.actions;

export default authSlice;
```

```mdx-code-block
</TabItem>
<TabItem value="Store">
```

```js title="store/store.js"
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    auth: authReducer.reducer,
  },
});
```

```mdx-code-block
</TabItem>
<TabItem value="authApi.js">
```

Api call to backend to get the user details and update the store with the details

```js title=authApi.js
import authSlice from "./store/authSlice";

export const authenticateUser = () => {
  return async (dispatch) => {
    const res = await getUserDetails(); // call to backend to get user details
    dispatch(authSlice.actions.authenticateUser({ userDetails: res.data }));
  };
};
```

```mdx-code-block
</TabItem>
<TabItem value="App.jsx">
```

Check the dispatch store everytime the app loads

```js title=App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//highlight-next-line
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
//highlight-next-line
import { authenticateUser } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Auth /> },
    ],
  },
]);

export default function App() {
  //highlight-next-line
  const dispatch = useDispatch();

  useEffect(() => {
    //highlight-next-line
    dispatch(authenticateUser());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
```

```mdx-code-block
</TabItem>
<TabItem value="Main.jsx">
```

```js title=Main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
//highlight-next-line
import { Provider } from "react-redux";

import App from "./App.jsx";
//highlight-next-line
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    //highlight-next-line
    <Provider store={store}>
      <App />
      //highlight-next-line
    </Provider>
  </React.StrictMode>
);
```

```mdx-code-block
</TabItem>
<TabItem value="Home.jsx">
```

Check the dispatch store every time Home loads

```js title=Home.jsx
import { useEffect } from "react";
//highlight-next-line
import { useSelector, useDispatch } from "react-redux";
//highlight-next-line
import { authenticateUser } from "../utils/auth";

export default function Home() {
  //highlight-next-line
  const dispatch = useDispatch();
  //highlight-next-line
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //highlight-next-line
  const userDetails = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    //highlight-next-line
    dispatch(authenticateUser());
  }, [dispatch]);

  return <>{isLoggedIn && <... />}</>;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

[See Code](https://github.com/vdwstoffel/code-docs/tree/main/examples/javascript/react/redux_with_ts)

```bash
.
├── index.html
├── src
│   ├── api
│   │   └── auth.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── store
│   │   ├── authSlice.ts
│   │   ├── storeHooks.ts
│   │   └── store.ts
```

```mdx-code-block
<Tabs>
<TabItem value="authslice.ts">
```

The authSlice file contains the initial state and the reducers for the authentication slice.

```ts
import { createSlice } from "@reduxjs/toolkit";

export interface State {
  user: { name: string; id: number };
  isLoggedIn: boolean;
}

const initialState: State = {
  user: { name: "Not Singed in", id: 0 },
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = { name: "Not Singed in", id: 0 };
      state.isLoggedIn = false;
    },
  },
});

export const { authenticateUser, logout } = authSlice.actions;
export default authSlice;
```

```mdx-code-block
</TabItem>
<TabItem value="store.ts">
```

The store file contains the store configuration and the types for the store.

```ts
import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

```mdx-code-block
</TabItem>
<TabItem value="storeHooks.ts">
```

The storeHooks file contains the custom hooks to use the store throughout the app.

```ts
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

```mdx-code-block
</TabItem>
<TabItem value="auth.ts">
```

The auth file contains the api call to the backend to get the user details and update the store with the details.

```ts
import authSlice from "../store/authSlice";
import { AppDispatch } from "../store/store";

export const signInUser = () => {
  return async (dispatch: AppDispatch) => {
    const fakeDBData = { name: "John", id: 547 };
    dispatch(authSlice.actions.authenticateUser({ user: fakeDBData }));
  };
};
```

```mdx-code-block
</TabItem>
<TabItem value="App.tsx">
```

The app file contains the main component of the app. It uses the custom hooks to access the store and dispatch actions.

```ts
import { useAppDispatch, useAppSelector } from "./store/storeHooks";
import { logout } from "./store/authSlice";
import { signInUser } from "./api/auth";

import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <p>Name: {userDetails.name}</p>
      <p>Id: {userDetails.id}</p>
      <p>Status: {isLoggedIn}</p>
      <button onClick={() => dispatch(signInUser())}>Sign In</button>
      <button onClick={() => dispatch(logout())}>Log Out</button>
    </>
  );
}

export default App;
```

```mdx-code-block
</TabItem>
<TabItem value="main.tsx">
```

the main file contains the root component of the app. It wraps the app component with the provider to provide the store to the app.

```ts
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store/store";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
</Tabs>
```
