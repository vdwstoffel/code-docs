---
sidebar_label: "Testing"
sidebar_position: 3
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Testing

## How to setup unit tests with vite

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

```bahs title="Terminal"
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
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
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
import App from "../App";

describe("App", () => {
  it("renders headline", () => {
    render(<App />);
    const headline = screen.getByText(/Vite \+ React/i);
    expect(headline).toBeInTheDocument();
  });
});
```

```mdx-code-block
</TabItem>
</Tabs>
```

[more info](https://vitest.dev/api/expect.html)