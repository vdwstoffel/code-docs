---
sidebar_label: "Testing"
sidebar_position: 5
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Testing

## Vite/React Testing Library

### How to setup unit tests with vite

**For projects setup with vite**

```bash title="Terminal"
.
├── index.html
├── package.json
├── src
│   ├── App.tsx
│   ├── main.tsx
│   ├── tests
│   │   ├── app.test.tsx
│   │   └── setup.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

```bash title="Terminal"
npm i vitest jsdom @testing-library/react @testing-library/jest-dom --save-dev
```

Install coverage dependancies

```bash title="Terminal"
npm i -D @vitest/coverage-istanbul
```

- Update the `vite.config.ts` file

```ts title="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    testMatch: ["./src/tests/**/*.test.tsx"],
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "json", "lcov"],
    },
  },
});
```

- Add the test scripts to `package.json`

```json title="package.json"
{
  "scripts": {
    "test": "vitest run --coverage"
  }
}
```

- Add a setup file for the test

```ts title="src/tests/setup.ts"
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

```mdx-code-block
<Tabs>
<TabItem value="App.tsx">
```

```tsx title="App.tsx"
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>This is a test file</h1>

      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Increase
      </button>
    </>
  );
}

export default App;

```

```mdx-code-block
</TabItem>
<TabItem value="app.test.tsx">
```

```ts title="app.test.tsx"
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test } from "vitest";
import App from "../App";

beforeEach(() => {
  render(<App />);
});

describe("App", () => {
  test("renders headline", () => {
    const headline = screen.getByText(/this is a test file/i); // i = case insensitive
    expect(headline).toBeInTheDocument();
  });

  test("button event", async () => {
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});

```

```mdx-code-block
</TabItem>
</Tabs>
```

**more info**
- [vitetest](https://vitest.dev/api/expect.html)
- [react-testing-library](https://testing-library.com/docs/react-testing-library/cheatsheet#queries)


### How to check if a component is rendered

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("renders component", () => {
  render(<App />);
  const component = screen.getByTestId("component");
  expect(component).toBeInTheDocument();
});
```

### How to click a button

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("click button", async () => {
  render(<App />);
  const button = screen.getByRole("button");
  await userEvent.click(button);
  expect(screen.getByText(/clicked/i)).toBeInTheDocument();
});
```

