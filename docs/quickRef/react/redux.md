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
<TabItem value="accountSlice.js">
```

```js title="accountSlice.js"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanReason: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    takeLoan(state, action) {
      state.balance += action.payload.amount;
      state.loan += action.payload.amount;
      state.loanReason = action.payload.reason;
    },
    payLoan(state) {
      if (state.loan === 0) return;

      state.balance -= state.loan;
      state.loan = 0;
      state.loanReason = "";
    },
  },
});

export const { deposit, withdraw, takeLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
```

```mdx-code-block
</TabItem>
<TabItem value="store.js">
```

```js title="store.js"
import { configureStore } from "@reduxjs/toolkit";

import accountSlice from "./accountSlice";

export default configureStore({
  reducer: {
    account: accountSlice,
  },
});
```

```mdx-code-block
</TabItem>
<TabItem value="main.jsx">
```

```js title="main.jsx"
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// highlight-next-line
import { Provider } from "react-redux";
// highlight-next-line
import store from "./store.js";

createRoot(document.getElementById("root")).render(
  //highlight-next-line
  <Provider store={store}>
    <App />
    // highlight-next-line
  </Provider>
);
```

```mdx-code-block
</TabItem>
<TabItem value="app.jsx">
```

```js title='app.js'
//highlight-next-line
import { useSelector, useDispatch } from "react-redux";
//highlight-next-line
import { deposit, withdraw, takeLoan, payLoan } from "./accountSlice";

export default function App() {
  //highlight-next-line
  const dispatch = useDispatch();
  //highlight-next-line
  const { balance, loan, loanReason } = useSelector((state) => state.account);

  function depositHandler() {
    dispatch(deposit(50));
  }

  function withdrawHandler() {
    dispatch(withdraw(30));
  }

  function takeLoanHandler() {
    dispatch(takeLoan({ amount: 100, reason: "Buy Car" }));
  }

  function payload() {
    dispatch(payLoan());
  }

  return (
    <>
      <h1>Balance ${balance}</h1>
      <h3>
        Outstanding loan: ${loan} - ({loanReason})
      </h3>
      <button onClick={depositHandler}>Deposit $50</button>
      <button onClick={withdrawHandler}>Withdraw $30</button>
      <button onClick={takeLoanHandler}>Take Loan</button>
      <button onClick={payload}>Pay Loan</button>
    </>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Preparing a reducer

When a payload is dispatched in an unwanted way, we can prepare the reducer to handle the payload in a more structured way.

```jsx
const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
  },
});
```

```jsx
dispatch(requestLoan(loanAmount, loanPurpose));
```


## Making API calls with the reducer

```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    }
  },
});

export const { withdraw } = accountSlice.actions;

export function deposit(amount, currency) {
  console.log(currency);
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }

  return async function (dispatch, getState) {
    let res = await fetch(`https://api.frankfurter.app/latest?base=${currency}&symbols=USD`);
    res = await res.json();
    const convertedAmount = (amount * res.rates["USD"]).toFixed(2);
    dispatch({ type: "account/deposit", payload: Number(convertedAmount) });
  };
}

export default accountSlice.reducer;
```