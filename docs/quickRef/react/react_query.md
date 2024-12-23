---
sidebar_label: "React Query"
sidebar_position: 5
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# React Query

React Query is a library that provides hooks for fetching, caching and updating asynchronous data in React.

## Install React Query

```bash
npm install @tanstack/react-query
```

## Install devtools

```bash
npm i @tanstack/react-query-devtools
```

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//highlight-next-line
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      //highlight-next-line
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  );
}
```

## Setting up React Query

The data is cached, so when moving to other pages, the data is still available and does not need to refresh unless it becomes stale.

```mdx-code-block
<Tabs>
<TabItem value="Creating QueryClient">
```

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // How long it takes before data becomse stale and get a refresh
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Cabin />
    </QueryClientProvider>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Consuming data">
```

```jsx
import { useQuery } from "@tanstack/react-query";

function getCabins() {
  // remote call function that returns a promise
}

export default function Cabin() {
  const { isPending, data, error, } = useQuery({
    queryKey: ["cabin"], // identifies the data
    queryFn: getCabins, // needs to return a promise, so no async and dont call the function
  });


  return (
    {data.map((cabin) => (
      <div key={cabin.id}>
        <h1>{cabin.name}</h1>
      </div>
    ))}
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Trigger reload after mutation

```mdx-code-block
<Tabs>
<TabItem value="Creating QueryClient">
```

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // How long it takes before data becomse stale and get a refresh
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Cabin />
    </QueryClientProvider>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Consuming data">
```

```jsx
import { useQuery } from "@tanstack/react-query";

function getCabins() {
  // remote call function that returns a promise
}

export default function Cabin() {
  const { isPending, data, error, } = useQuery({
    queryKey: ["cabin"], // identifies the data
    queryFn: getCabins, // needs to return a promise, so no async and dont call the function
  });


  return (
    {data.map((cabin) => (
      <CabinItems cabin={cabin} />
    ))}
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Deleting data">
```

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function deleteCabin(cabinId) {
  // remote call function that returns a promise
}

export default function CabinItem({ cabin }) {
  const { cabinId, name } = cabin;

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: deleteCabin,
    // Invalid the data to force a new fetch
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"], // key created in the useQuery
      });
    },
    onError: (err) => console.log(err.message),
  });

  return (
    <>
      <h1>{name}</h1>
      <button onClick={() => mutate(cabinId)}>Delete</button>
    </>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

