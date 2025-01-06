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
<TabItem value="App">
```

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Setup from "./components/Setup";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Setup />
        </QueryClientProvider>
    );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Setup">
```

```jsx
import { useQuery } from "@tanstack/react-query";

import { getData } from "../utils/api";

export default function Setup() {
    const { isPending, error, data } = useQuery({
        queryKey: ["data"],
        queryFn: getData,
    });

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Error: {error.status} - {error.message} </p>;

    return (
        <>
            <h1>Basic Setup</h1>
            <p>{data.description}</p>
        </>
    );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Updating data with mutations

```mdx-code-block
<Tabs>
<TabItem value="App">
```

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Mutations from "./components/Mutations";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Mutations />
        </QueryClientProvider>
    );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Mutations">
```

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getItems, addItem } from "../utils/fakeServer";

export default function Mutations() {
    const queryClient = useQueryClient(); // get access to the queryClient

    const {
        isPending: isFetching, error, data } = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
    });

    // Mutation Function
    const { isPending: isPosting, mutate } = useMutation({
        mutationFn: addItem,
        onSuccess: () => {
            // Invalidate and refetch
            // highlight-next-line
            queryClient.invalidateQueries({ queryKey: ["items"] });
        },
        onError: () => console.log(error),
    });

    // Check the status of the data loading
    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Error: {error.status} - {error.message} </p>;
    
    return (
        <>
            <h1>Mutations</h1>
            // highlight-next-line
            <button disabled={isPosting} onClick={() => mutate("hello")}>
                {isPosting ? "Loading" : "Post"}
            </button>
            <ul>
                {data.map((item: string) => (
                    <li>{item}</li>
                ))}
            </ul>
        </>
    );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Passing multiple args to mutation

Since mutations can only accept one argument, multiple args should be passed as an object

```mdx-code-block
<Tabs>
<TabItem value="App">
```

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Mutations from "./components/Mutations";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Mutations />
    </QueryClientProvider>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Mutation">
```

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getNames, addName } from "../utils/fakeServer";

export default function MutationFnMultipleArgs() {
  const queryClient = useQueryClient(); // get access to the queryClient

  const {
    isPending: isFetching, error, data } = useQuery({
    queryKey: ["names"],
    queryFn: getNames,
  });

  // Mutation Function
  const { isPending: isPosting, mutate } = useMutation({
    mutationFn: ({ name, surname }) => addName(name, surname),
    onSuccess: () => {
      // Invalidate and refetch
        // highlight-next-line
      queryClient.invalidateQueries({ queryKey: ["names"] });
    },
    onError: () => console.log(error),
  });

  // Check the status of the data loading
  if (isFetching) return <p>Loading...</p>;
  if (error) <p> Error: {error.status} - {error.message} </p>;

  return (
    <>
      <h1>Mutations Function with multiple args</h1>
      <button
        disabled={isPosting}
        // highlight-next-line
        onClick={() => mutate({ name: "hello", surname: "world" })}
      >
        {isPosting ? "Loading" : "Post"}
      </button>
      <ul>
        {data.map((data) => (
          <li>
            {data.surname}, {data.name}
          </li>
        ))}
      </ul>
    </>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Creating query hooks

```mdx-code-block
<Tabs>
<TabItem value="App">
```

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import QueryHooks from "./components/QueryHooks";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <QueryHooks />
        </QueryClientProvider>
    );
}
```

```mdx-code-block

</TabItem>
<TabItem value="useNames Hook">
```

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getNames, addName } from "./fakeServer";

export function useGetNames() {
    const {isPending, error, data: names } = useQuery({
        queryKey: ["names"],
        queryFn: getNames,
    });

    return { isPending, error, names };
}

export function useAddName() {
    const queryClient = useQueryClient();

    const { isPending: isPosting, mutate: addNewName } = useMutation({
        mutationFn: ({ name, surname }) => addName(name, surname),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["names"] });
        },
        onError: () => console.log(error),
    });

    return { isPosting, addNewName };
}
```

```mdx-code-block
</TabItem>
<TabItem value="QueryHooks">
```

```tsx
import { useGetNames, useAddName } from "../utils/useNames";

export default function QueryHooks() {
    const { isPending, error, names } = useGetNames();
    const { isPosting, addNewName } = useAddName();

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <>
            <h1>Query Hooks </h1>
            <button
                disabled={isPosting}
                onClick={() => addNewName({ name: "hello", surname: "world" })}
            >
                {isPosting ? "Loading" : "Post"}
            </button>
            {names.map((user) => (
                <p>
                    {user.name} {user.surname}
                </p>
            ))}
        </>
    );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```
