import React, { useState, useCallback } from "react";
import BrowserWindow from "../BrowserWindow/BrowserWindow";

// Child component that receives a callback
const Button = React.memo(({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
});

export default function UseCallbackExample() {
  const [count, setCount] = useState(0);

  // Without useCallback, this function will be re-created on every render
  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []); // Dependency array is empty, so it will only be created once

  return (
    <BrowserWindow>
      <div>
        <h1>Count: {count}</h1>
        <Button onClick={increment} text="Increment" />
      </div>
    </BrowserWindow>
  );
}
