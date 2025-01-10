---
sidebar_label: Tailwind
sidebar_position: 100
---

import tailwindLogo from "@site/static/img/tailwind.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

# Tailwind CSS (with React)

<DisplayLogo logo={tailwindLogo}/>

## Setting up tailwind

```bash title="Terminal"
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

This will create a file called `tailwind.config.js` in the root of your project.
In this file edit the following

```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
export default {
  // highlight-start
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // highlight-end
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Then in your main css at this at the top

```css title="src/index.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usefull tools

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Prettier Plugin

- [Prettier-plugin-tailwind](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

```bash title="Terminal"
npm install -D prettier prettier-plugin-tailwindcss
```

## How to create reusable classes

In your main css file create a customInput class by using the @layer directive and @apply directive

```css title="index.css"
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .customInput {
    @apply w-full rounded-full border border-stone-200 px-4 py-4;
  }
}
```

Then in your component use the customInput class

```jsx title="src/components/Input.js"

export default function Input = () => {
  return <input className="customInput" />;
};

```

## How to define your own css values

```js
<span className="absolute right-1"></span>  // Tailwind class

<span className="absolute right-[3px]"></span>  //Defining your own value
```
