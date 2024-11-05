---
sidebar_label: "Redux"
sidebar_position: 5
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Redux

## Create a store with createStore (deprecated)

```bash
npm install redux react-redux
```

```bash
├── App.jsx
├── bankSlice.jsx
├── main.jsx
└── store.js
```

```mdx-code-block
<Tabs>
<TabItem value="bankSlice.jsx">
```

```jsx title=bankSlice.js
const initialState = {
  balance: 0,
  loan: 0,
  reason: "",
};

export default function bankReducer(state = initialState, action) {
  switch (action.type) {
    case "bank/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "bank/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "bank/requestLoan":
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: state.loan + action.payload.amount,
        reason: state.reason,
      };
    case "bank/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        reason: "",
      };
    default:
      return state;
  }
}

export function deposit(amount) {
  return { type: "bank/deposit", payload: amount };
}

export function withdraw(amount) {
  return { type: "bank/withdraw", payload: amount };
}

export function requestLoan(amount, reason) {
  return {
    type: "bank/requestLoan",
    payload: { amount: amount, reason: reason },
  };
}

export function payLoan() {
  return { type: "bank/payLoan" };
}
```

```mdx-code-block
</TabItem>
<TabItem value="store.js">
```

```jsx title=store.jsx
import { createStore, combineReducers } from "redux";

import bankReducer from "./bankSlice";

// Additional reducers can be added
const rootReducer = combineReducers({
  bank: bankReducer,
});

const store = createStore(rootReducer);
export default store;
```

```mdx-code-block
</TabItem>
<TabItem value="main.jsx">
```

```jsx title=main.jsx
import { createRoot } from "react-dom/client";
//highlight-next-line
import { Provider } from "react-redux";
import App from "./App.jsx";
//highlight-next-line
import store from "./store.js";

createRoot(document.getElementById("root")).render(
  //highlight-next-line
  <Provider store={store}>
    <App />
    //highlight-next-line
  </Provider>
);
```

```mdx-code-block
</TabItem>
<TabItem value="app.jsx">
```

```jsx title=app.jsx
//highlight-next-line
import { useSelector, useDispatch } from "react-redux";

import { deposit, withdraw, requestLoan, payLoan } from "./bankSlice";

function App() {
  //highlight-next-line
  const { balance, loan, reason } = useSelector((state) => state.bank);
  //highlight-next-line
  const dispatch = useDispatch();

  function depositHandler() {
    dispatch(deposit(50));
  }

  function withdrawHandler() {
    dispatch(withdraw(30));
  }

  function loanHandler() {
    dispatch(requestLoan(100, "Buy Car"));
  }

  function payLoanHandler() {
    dispatch(payLoan());
  }

  return (
    <>
      <h1>Current Balance: {balance}</h1>
      <h1>Outstanding Loan: {loan}</h1>
      <h1>Loan Reason: {reason}</h1>
      <button onClick={depositHandler}>Deposit $50</button>
      <button onClick={withdrawHandler}>WithDraw $30</button>
      <button onClick={loanHandler}>Take Loan $100</button>
      <button onClick={payLoanHandler}>PayLoan</button>
    </>
  );
}

export default App;
```

```mdx-code-block
</TabItem>
</Tabs>
```

## How to setup a store with Redux Toolkit

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
