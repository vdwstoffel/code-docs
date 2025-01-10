# Styled Components

## Install

```bash
npm i styled-compoents
```

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import BrowserWindow from "@site/src/components/BrowserWindow/BrowserWindow"

## Create a basic styled component

```jsx
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: red;
`;

export default function App() {
  return (
    <>
      <H1>Hello World</H1>
    </>
  );
}
```

<BrowserWindow>
<h1 style={{fontSize: "30px", fontWeight: "30px", color: "red"}}>Hello World</h1>
</BrowserWindow>

## Create a global style

```bash title="Terminal"
.
├── App.jsx
├── GlobalStyles.js
```

```mdx-code-block
<Tabs>
<TabItem value="App">
```

!Note that the `GlobalStyles` cannot accept children so it needs to be a sibling component

```jsx
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: red;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <H1>Hello World</H1>
    </>
  );
}

export default App;
```

```mdx-code-block
</TabItem>
<TabItem value="GlobalStyles">
```

```js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}
`;
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Using global variable

```bash title="Terminal"
.
├── App.jsx
├── GlobalStyles.js
```

```mdx-code-block
<Tabs>
<TabItem value="App">
```

!Note that the `GlobalStyles` cannot accept children so it needs to be a sibling component

```jsx
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: var(--color-brand-50);
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <H1>Hello World</H1>
    </>
  );
}

export default App;
```

```mdx-code-block
</TabItem>
<TabItem value="GlobalStyles">
```

```js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --color-brand-50: #eef2ff;
}
`;
```

```mdx-code-block
</TabItem>
</Tabs>
```

## How to apply a psuedo class

```jsx
const Button = styled.button`
  background-color: red;

  &:hover {
    background-color: black;
  }
`;
```

## Creating dynamic styles

```mdx-code-block
<Tabs>
<TabItem value="App">
```

!Note that the `GlobalStyles` cannot accept children so it needs to be a sibling component

```jsx
import Heading from "./ui/Heading";

export default function App() {
  return (
    <>
      <Heading as="h1">Hello World</Heading>
      <Heading as="h2">By World</Heading>
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Heading.jsx">
```

```js
import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 30px;
      font-weight: 600;
      color: red;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 30px;
      font-weight: 600;
      color: blue;
    `}

    line-height: 1.4; //will be applied to all styles
`;

export default Heading;
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Setting default props

```jsx
import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
```

## Usefull info

### vsCode Extension

[vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)
