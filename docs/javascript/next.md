---
sidebar_label: "Next.js"
sidebar_position: 4
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Next

## Setup new project

```bash
npx create-next-app@latest
```

## Layout

```bash
.
├── components
│   └── Layout.jsx
└── pages
    ├── _app.jsx
    ├── index.jsx
    └── PageOne.jsx
```

```mdx-code-block
<Tabs>
<TabItem value="Layout.jsx">
```

```javascript
import Link from "next/link";

export default function Layout(props) {
  // create your header and then add your app
  return (
    <>
      <header>
        <nav>
          <Link href="/">Index</Link>
          <Link href="/PageOne">PageOne</Link>
        </nav>
      </header>
      <main>{props.children}</main> {/* add the rest of the app */}
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="_app.jsx">
```

```javascript
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="index.jsx">
```

```javascript
export default function Index() {
  return <h1>Index</h1>;
}
```

```mdx-code-block
</TabItem>
<TabItem value="PageOne.jsx">
```

```javascript
export default function PageOne() {
  return <h1>Page One</h1>;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Routes

```bash
.
└── pages
    ├── [dynamicFolder]
    │   └── index.jsx
    ├── index.jsx
    └── posts
        ├── index.jsx
        └── [postId].jsx
```

```mdx-code-block
<Tabs>
<TabItem value="/pages/index.jsx">
```

```javascript
import Link from "next/link";

export default function Index() {
  return (
    <>
      <h1>Main Index at /</h1>
      <Link href="/posts">Go to Posts</Link>
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="/pages/posts/index.jsx">
```

```javascript title="/pages/posts/index.jsx"
import { Fragment } from "react";
import Link from "next/link";

export default function News() {
  return (
    <Fragment>
      <h1>Posts Index at /posts</h1>
      <li>
        <Link href="/posts/cats">Cats</Link>
      </li>
      <li>
        <Link href="/posts/dogs">Dogs</Link>
      </li>
    </Fragment>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="/pages/posts/[postId].jsx">
```

```javascript
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const url = router.query.postId; // give access to the dynamic param
  // Should match the file name
  const goBack = () => {
    router.push("/posts");
  };

  return (
    <>
      <h1>{url}</h1>
      <button onClick={goBack}>Back</button>
    </>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="/pages/[dynamicFolder]/index.jsx">
```

```javascript
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const url = router.query.dynamicFolder; // give access to the dynamic param
  // Should match the folder name
  const goBack = () => {
    router.push("/posts");
  };

  return (
    <>
      <h1>This is a dynamic folder at /{url}</h1>
      <button onClick={goBack}>Back</button>
    </>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Get Static Props

```javascript
import axios from "axios";

export default function Index(props) {
  // receives the data as props argument
  return <h1>{props.swapiData.name}</h1>;
}

// only works in page component files
export async function getStaticProps(context) {
  /*
   * will call the props before calling the component
   * Code in this block never shows on client side
   */
  const params = context;
  console.log(params);

  const response = await axios.get("https://swapi.dev/api/people/1/");
  const peopleData = response.data;
  return { props: { swapiData: peopleData } };
}
```

## Get Server Side Props

```javascript
import axios from "axios";

export default function Index(props) {
  // receives the data as props argument
  return <h1>{props.swapiData.name}</h1>;
}

// only works in page component files
export async function getServerSideProps(context) {
  // runs on server not client
  // regenerated on every request
  const req = context.req;
  const res = context.res;
  const query = context.query;
  const url = req.url; // get access to the url

  const response = await axios.get("https://swapi.dev/api/people/1/");
  const peopleData = response.data;
  return {
    props: { swapiData: peopleData },
  };
}
```

## Get Static Path

```bash
└── pages
    ├── [charId]
    │   └── index.jsx
    └── index.jsx
```

```javascript title="/pages/index.jsx"
import Link from "next/link";

export default function Index(props) {
  // receives the data as props argument
  return (
    <>
      <Link href="/1">1</Link>
      <Link href="/2">2</Link>
    </>
  );
}
```

```javascript title="/pages/[charId]/index.jsx"
import { useRouter } from "next/router";
import axios from "axios";

export default function Character(props) {
  const router = useRouter();
  const page = router.query.charId;

  return <h1>{props.swapiData.name}</h1>;
}

export async function getStaticPaths() {
  // used with page component that is dynamic with static props
  // Choose which paths should be pre-generated
  return {
    fallback: false, // or 'blocking' or 'true' based on your needs
    paths: [
      {
        params: { charId: "1" },
      },
      {
        params: { charId: "2" },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const charId = context.params.charId; // get access the the dynamic url path

  const response = await axios.get(`https://swapi.dev/api/people/${charId}/`);
  const peopleData = response.data;

  return {
    props: { swapiData: peopleData },
  };
}
```

## API

```bash
└── pages
    ├── api
    │   └── firebase.js
    ├── index.jsx
    └── showItems.jsx
```

```javascript title="/pages/index.jsx"
import { useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Index() {
  const myLabel = useRef();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredLabel = myLabel.current.value; // get the value from the label
    // make a request to your own api backend
    await axios.post("/api/firebase/", { myLabel: enteredLabel }, { headers: { "Content-Type": "application/data" } });
    router.push("/showItems"); // redirect to another page
  };

  return (
    <>
      <h1>Index</h1>
      <input ref={myLabel} />
      <button onClick={submitHandler}>Submit</button>
    </>
  );
}
```

```javascript title="/pages/showitems.jsx"
import axios from "axios";
require("dotenv").config({ path: "../../../.env" });

export default function showItems(props) {
  const firebaseData = props;
  return (
    <>
      <h1>{JSON.stringify(firebaseData.data)}</h1>
    </>
  );
}

// only works in page component files
export async function getStaticProps(context) {
  // since this is run on the server and not shown on the client it is okay to do it like this
  // and no need for api route
  const response = await axios.get(process.env["FIREBASE"]);
  const peopleData = response.data;
  return {
    props: { data: peopleData },
  };
}
```

```javascript title="/pages/api/firebase.js"
import axios from "axios";
require("dotenv").config({ path: "../../../.env" });

export default async function handler(req, res) {
  const url = process.env["FIREBASE"];

  // check if the correct method is used
  if (req.method === "POST") {
    await axios.post(url, req.body);
    res.end();
  }
}
```

## Google Fonts

In to pages folder create a file called \_document.jsx

```javascript title="_document.jsx"
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add google fonts in the head */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## Add Bootstrap

in the pages folder create a file: \_document.jsx.
Restart the server

```javascript title="_document.jsx"
import { Html, Head, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html lang="en">
      <Head>
        {/*BOOTSTRAP CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* BOOTSTRAP JS */}
      </body>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossOrigin="anonymous"
        defer
      />
    </Html>
  );
}

export default Document;
```
