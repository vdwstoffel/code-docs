---
sidebar_label: "Usefull libraries"
sidebar_position: 999
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Usefull libraries

## React Hot Toast

A super easy toast library for React

https://react-hot-toast.com/

```bash
npm install react-hot-toast
```

```jsx
//highlight-next-line
import toast, { Toaster } from "react-hot-toast";
//highlight-next-line
const notify = () => toast("Here is your toast.");

const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      //highlight-next-line
      <Toaster />
    </div>
  );
};
```

## React Hook Form

Performant, flexible and extensible forms with easy-to-use validation

https://react-hook-form.com/

```bash
npm install react-hook-form
```

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```jsx
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```tsx
mport { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  example: string
  exampleRequired: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## React Icons

Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.

```bash
npm install react-icons --save
```

```jsx
import { FaBeer } from "react-icons/fa";

export default function MyComponent() {
  return (
    <h3>
      Lets go for a <FaBeer />?
    </h3>
  );
}
```

## Leaflet

[Official Docs](https://react-leaflet.js.org/)

```bash
npm i react-leaflet leaflet
npm install -D @types/leaflet
```

```mdx-code-block
<Tabs>
<TabItem value="main.jsx">
```

```jsx title="main.jsx"
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
//highlight-next-line
import "./global.css"

createRoot(document.getElementById('root')!).render(
    <App />
)
```

```mdx-code-block
</TabItem>
<TabItem value="global.css">
```

```css title="global.css"
@import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
```

```mdx-code-block
</TabItem>
<TabItem value="App.tsx">
```

```jsx title="App.tsx"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function App() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Update the center of the map

Each time you click on a button that changes the poition of the map, the map will recenter to the new position.

```jsx
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

export default function Map() {
  const [position, setPosition] = useState([51, 3]);
  return (
    <>
      <div>
        <button onClick={() => setPosition([51, 9])}>Pos 1</button>
        <button onClick={() => setPosition([46, 18])}>Pos 2</button>
      </div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        //highlight-next-line
        <ChangeCenter position={position} />
      </MapContainer>
    </>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
```

### Add a click event to the map

```jsx
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

export default function Map() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "500px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      //highlight-next-line
      <ClickEvent />
    </MapContainer>
  );
}

function ClickEvent() {
  useMapEvents({
    click: (e) => {
      console.log(e.latlng);
    },
  });
  return null;
}
```

