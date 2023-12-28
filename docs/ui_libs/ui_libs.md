---
sidebar_label: "UI Libraries"
sidebar_position: 203
---

# UI Libraries

## PrimeReact

[Docs](https://primereact.org/)

```bash
npm install primereact
```

```jsx title="main.jsx"
import React from "react";
import ReactDOM from "react-dom/client";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
);
```

### Header

```jsx
import { Menubar } from "primereact/menubar";

export default function Header() {
  // Recreate the original css
  const menuItem = (item, options) => {
    return (
      <>
        <Link className={options.className} to={item.url} role="menuItem" aria-haspopup="false" data-pc-section="false">
          <span className={options.iconClassName}></span>
          <span className={options.labelClassName}>{item.label}</span>
        </Link>
      </>
    );
  };

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      url: "/",
      template: (item, options) => menuItem(item, options),
    },
    {
      label: "Main",
      icon: "pi pi-fw pi-cart-plus",
      items: [
        {
          label: "Sub 1",
          icon: "pi pi-fw pi-book",
          url: "/orders",
          template: (item, options) => menuItem(item, options),
        },
        {
          label: "Sub 2",
          icon: "pi pi-fw pi-globe",
          url: "/orders/ordersCountry",
          template: (item, options) => menuItem(item, options),
        },
      ],
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
}
```
